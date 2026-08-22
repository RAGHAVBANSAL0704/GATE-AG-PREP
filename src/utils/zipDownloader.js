// Pure JS Zero-Dependency ZIP Archive Builder & Downloader
// Implements standard uncompressed PKZIP (Store) specification

function makeCrcTable() {
  const cTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    cTable[n] = c;
  }
  return cTable;
}

const crcTable = makeCrcTable();

function calculateCrc32(uint8Array) {
  let crc = 0xffffffff;
  for (let i = 0; i < uint8Array.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ uint8Array[i]) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function writeUint16(view, offset, value) {
  view.setUint16(offset, value, true);
}

function writeUint32(view, offset, value) {
  view.setUint32(offset, value, true);
}

export async function createZipArchive(filesList) {
  // filesList is an array of objects: { name: string, data: Uint8Array | ArrayBuffer | string }
  const fileEntries = [];

  for (const f of filesList) {
    let uint8Data;
    if (typeof f.data === 'string') {
      uint8Data = new TextEncoder().encode(f.data);
    } else if (f.data instanceof Uint8Array) {
      uint8Data = f.data;
    } else if (f.data instanceof ArrayBuffer) {
      uint8Data = new Uint8Array(f.data);
    } else {
      uint8Data = new Uint8Array(0);
    }

    const nameBytes = new TextEncoder().encode(f.name);
    const crc = calculateCrc32(uint8Data);
    fileEntries.push({
      nameBytes,
      data: uint8Data,
      crc,
      size: uint8Data.length,
    });
  }

  // Calculate local headers & central dir sizes
  let localOffset = 0;
  const processedFiles = [];

  for (const entry of fileEntries) {
    const localHeaderSize = 30 + entry.nameBytes.length;
    const offset = localOffset;
    localOffset += localHeaderSize + entry.size;

    processedFiles.push({
      ...entry,
      offset,
    });
  }

  const centralDirOffset = localOffset;
  let centralDirSize = 0;

  for (const entry of processedFiles) {
    centralDirSize += 46 + entry.nameBytes.length;
  }

  const eocdSize = 22;
  const totalZipSize = centralDirOffset + centralDirSize + eocdSize;
  const buffer = new ArrayBuffer(totalZipSize);
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  let currentOffset = 0;

  // 1. Write Local File Headers + Data
  for (const entry of processedFiles) {
    writeUint32(view, currentOffset, 0x04034b50); // Local header signature
    writeUint16(view, currentOffset + 4, 10);      // Version needed
    writeUint16(view, currentOffset + 6, 0);       // Bit flag
    writeUint16(view, currentOffset + 8, 0);       // Compression (Store)
    writeUint16(view, currentOffset + 10, 0);      // Time
    writeUint16(view, currentOffset + 12, 0);      // Date
    writeUint32(view, currentOffset + 14, entry.crc);
    writeUint32(view, currentOffset + 18, entry.size); // Compressed size
    writeUint32(view, currentOffset + 22, entry.size); // Uncompressed size
    writeUint16(view, currentOffset + 26, entry.nameBytes.length);
    writeUint16(view, currentOffset + 28, 0);      // Extra field length

    currentOffset += 30;
    bytes.set(entry.nameBytes, currentOffset);
    currentOffset += entry.nameBytes.length;

    bytes.set(entry.data, currentOffset);
    currentOffset += entry.size;
  }

  // 2. Write Central Directory Headers
  for (const entry of processedFiles) {
    writeUint32(view, currentOffset, 0x02014b50); // Central header signature
    writeUint16(view, currentOffset + 4, 20);      // Version made by
    writeUint16(view, currentOffset + 6, 10);      // Version needed
    writeUint16(view, currentOffset + 8, 0);       // Bit flag
    writeUint16(view, currentOffset + 10, 0);      // Compression
    writeUint16(view, currentOffset + 12, 0);      // Time
    writeUint16(view, currentOffset + 14, 0);      // Date
    writeUint32(view, currentOffset + 16, entry.crc);
    writeUint32(view, currentOffset + 20, entry.size);
    writeUint32(view, currentOffset + 24, entry.size);
    writeUint16(view, currentOffset + 28, entry.nameBytes.length);
    writeUint16(view, currentOffset + 30, 0);      // Extra field length
    writeUint16(view, currentOffset + 32, 0);      // File comment length
    writeUint16(view, currentOffset + 34, 0);      // Disk start
    writeUint16(view, currentOffset + 36, 0);      // Internal attributes
    writeUint32(view, currentOffset + 38, 0);      // External attributes
    writeUint32(view, currentOffset + 42, entry.offset); // Local header offset

    currentOffset += 46;
    bytes.set(entry.nameBytes, currentOffset);
    currentOffset += entry.nameBytes.length;
  }

  // 3. Write End of Central Directory (EOCD)
  writeUint32(view, currentOffset, 0x06054b50);   // EOCD signature
  writeUint16(view, currentOffset + 4, 0);        // Disk num
  writeUint16(view, currentOffset + 6, 0);        // Central dir disk
  writeUint16(view, currentOffset + 8, processedFiles.length); // Records on disk
  writeUint16(view, currentOffset + 10, processedFiles.length); // Total records
  writeUint32(view, currentOffset + 12, centralDirSize);
  writeUint32(view, currentOffset + 16, centralDirOffset);
  writeUint16(view, currentOffset + 20, 0);       // Comment length

  return new Blob([buffer], { type: 'application/zip' });
}

export async function downloadBulkZip(filesInfo, zipFilename) {
  // filesInfo: Array of { name: string, url?: string, data?: string|Uint8Array }
  const filesList = [];

  for (const item of filesInfo) {
    try {
      if (item.data) {
        filesList.push({ name: item.name, data: item.data });
      } else if (item.url) {
        const response = await fetch(item.url);
        if (response.ok) {
          const buffer = await response.arrayBuffer();
          filesList.push({ name: item.name, data: buffer });
        }
      }
    } catch (e) {
      console.warn(`Failed to fetch file for ZIP: ${item.name}`, e);
    }
  }

  if (filesList.length === 0) {
    throw new Error("No files were successfully fetched for ZIP creation.");
  }

  const zipBlob = await createZipArchive(filesList);
  const downloadUrl = URL.createObjectURL(zipBlob);
  const anchor = document.createElement('a');
  anchor.href = downloadUrl;
  anchor.download = zipFilename || 'GATE_AG_Bulk_Download.zip';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);
}
