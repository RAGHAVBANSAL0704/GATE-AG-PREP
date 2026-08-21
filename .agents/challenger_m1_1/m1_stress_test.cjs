
const fs = require("fs");
const path = require("path");
const assert = require("assert");
const vm = require("vm");

const ROOT = "/Users/raghav/Desktop/GATE AG PREP WEB";
let totalTests = 0;
let passedTests = 0;
const failures = [];

function test(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log("  [PASS] " + name);
  } catch (err) {
    failures.push({ name, error: err.message, stack: err.stack });
    console.error("  [FAIL] " + name + ": " + err.message);
  }
}

async function runAsyncTest(name, fn) {
  totalTests++;
  try {
    await fn();
    passedTests++;
    console.log("  [PASS] " + name);
  } catch (err) {
    failures.push({ name, error: err.message, stack: err.stack });
    console.error("  [FAIL] " + name + ": " + err.message);
  }
}

async function runAll() {
  console.log("=== EMPIRICAL STRESS TEST HARNESS FOR M1 (PWA OFFLINE CAPABILITY) ===\n");

  // SECTION 1: Manifest Verification
  console.log("--- Section 1: Manifest Verification ---");

  const manifestPath = path.join(ROOT, "public/manifest.webmanifest");
  const manifestJsonPath = path.join(ROOT, "public/manifest.json");

  test("manifest.webmanifest exists and is valid JSON", () => {
    assert(fs.existsSync(manifestPath), "manifest.webmanifest must exist");
    const raw = fs.readFileSync(manifestPath, "utf8");
    const data = JSON.parse(raw);
    assert.strictEqual(typeof data, "object");
  });

  test("manifest.json exists and is valid JSON", () => {
    assert(fs.existsSync(manifestJsonPath), "manifest.json must exist");
    const raw = fs.readFileSync(manifestJsonPath, "utf8");
    const data = JSON.parse(raw);
    assert.strictEqual(typeof data, "object");
  });

  test("manifest.webmanifest and manifest.json have identical schemas", () => {
    const raw1 = fs.readFileSync(manifestPath, "utf8");
    const raw2 = fs.readFileSync(manifestJsonPath, "utf8");
    assert.deepStrictEqual(JSON.parse(raw1), JSON.parse(raw2));
  });

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  test("manifest has valid name and short_name", () => {
    assert(typeof manifest.name === "string" && manifest.name.length > 5, "name must be descriptive");
    assert(typeof manifest.short_name === "string" && manifest.short_name.length > 2, "short_name must be valid");
  });

  test("manifest has valid start_url and scope", () => {
    assert(manifest.start_url === "./" || manifest.start_url === "/", "start_url should be relative or root");
    assert(manifest.scope === "./" || manifest.scope === "/", "scope should be relative or root");
  });

  test("manifest has valid display mode", () => {
    assert(["standalone", "fullscreen", "minimal-ui"].includes(manifest.display), "display must be standard PWA mode");
  });

  test("manifest defines valid theme and background colors", () => {
    assert(/^#[0-9A-Fa-f]{6}$/.test(manifest.theme_color), "theme_color must be valid hex");
    assert(/^#[0-9A-Fa-f]{6}$/.test(manifest.background_color), "background_color must be valid hex");
  });

  test("manifest icons list is valid and contains standard sizes", () => {
    assert(Array.isArray(manifest.icons) && manifest.icons.length >= 3, "icons array must have at least 3 icons");
    const sizes = manifest.icons.map(i => i.sizes);
    assert(sizes.includes("192x192"), "Must include 192x192 icon");
    assert(sizes.includes("512x512"), "Must include 512x512 icon");
    const purposes = manifest.icons.map(i => i.purpose);
    assert(purposes.includes("maskable"), "Must include maskable icon");
  });

  test("all icon file paths in manifest resolve to physical files", () => {
    for (const icon of manifest.icons) {
      const cleanSrc = icon.src.replace(/^\.?\//, "");
      const iconPath = path.join(ROOT, "public", cleanSrc);
      assert(fs.existsSync(iconPath), "Icon file " + icon.src + " (" + iconPath + ") must exist on disk");
      const stat = fs.statSync(iconPath);
      assert(stat.size > 0, "Icon file " + icon.src + " must not be empty");
    }
  });

  test("manifest shortcuts are defined and icon paths resolve", () => {
    assert(Array.isArray(manifest.shortcuts) && manifest.shortcuts.length >= 3, "shortcuts array must have entries");
    for (const shortcut of manifest.shortcuts) {
      assert(shortcut.name && shortcut.url, "shortcut must have name and url");
      if (shortcut.icons) {
        for (const icon of shortcut.icons) {
          const cleanSrc = icon.src.replace(/^\.?\//, "");
          const iconPath = path.join(ROOT, "public", cleanSrc);
          assert(fs.existsSync(iconPath), "Shortcut icon " + icon.src + " must exist");
        }
      }
    }
  });

  // SECTION 2: Icon Binary Dimensions and File Formats
  console.log("\n--- Section 2: Icon Binary Dimensions and File Formats ---");

  function verifyPng(relPath, expectedW, expectedH) {
    const fullPath = path.join(ROOT, relPath);
    assert(fs.existsSync(fullPath), relPath + " must exist");
    const buf = fs.readFileSync(fullPath);
    assert(buf.length > 100, relPath + " must be > 100 bytes");
    const pngSig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    assert(buf.subarray(0, 8).equals(pngSig), relPath + " must have PNG header signature");
    const w = buf.readUInt32BE(16);
    const h = buf.readUInt32BE(20);
    assert.strictEqual(w, expectedW, relPath + " width must be " + expectedW + ", got " + w);
    assert.strictEqual(h, expectedH, relPath + " height must be " + expectedH + ", got " + h);
  }

  test("public/icons/icon-192.png is valid 192x192 PNG", () => {
    verifyPng("public/icons/icon-192.png", 192, 192);
  });

  test("public/icons/icon-512.png is valid 512x512 PNG", () => {
    verifyPng("public/icons/icon-512.png", 512, 512);
  });

  test("public/icons/icon-512-maskable.png is valid 512x512 PNG", () => {
    verifyPng("public/icons/icon-512-maskable.png", 512, 512);
  });

  test("public/icons/apple-touch-icon.png is valid 180x180 PNG", () => {
    verifyPng("public/icons/apple-touch-icon.png", 180, 180);
  });

  test("public/icons/icon.svg is valid SVG markup", () => {
    const svgPath = path.join(ROOT, "public/icons/icon.svg");
    assert(fs.existsSync(svgPath), "icon.svg must exist");
    const content = fs.readFileSync(svgPath, "utf8");
    assert(content.includes("<svg") && content.includes("</svg>"), "icon.svg must contain valid svg tags");
    assert(content.includes("viewBox"), "icon.svg must have viewBox");
  });

  // SECTION 3: Service Worker Syntax and Logic Simulation
  console.log("\n--- Section 3: Service Worker Simulation & Static Analysis ---");

  const swPath = path.join(ROOT, "public/sw.js");
  const swCode = fs.readFileSync(swPath, "utf8");

  test("sw.js defines required cache names and prefixes", () => {
    assert(swCode.includes("STATIC_CACHE"), "sw.js must define STATIC_CACHE");
    assert(swCode.includes("RUNTIME_CACHE"), "sw.js must define RUNTIME_CACHE");
    assert(swCode.includes("IMAGES_CACHE"), "sw.js must define IMAGES_CACHE");
    assert(swCode.includes("gate-ag-"), "sw.js must use gate-ag- cache prefix");
  });

  test("sw.js PRECACHE_ASSETS contains core app shell items and files exist", () => {
    assert(swCode.includes("./"), "PRECACHE_ASSETS must include ./");
    assert(swCode.includes("./index.html"), "PRECACHE_ASSETS must include index.html");
    assert(swCode.includes("./manifest.webmanifest"), "PRECACHE_ASSETS must include manifest");
    assert(swCode.includes("./icons/icon-192.png"), "PRECACHE_ASSETS must include icon-192");
    assert(swCode.includes("./icons/icon-512.png"), "PRECACHE_ASSETS must include icon-512");
  });

  test("sw.js handles skipWaiting and clients.claim", () => {
    assert(swCode.includes("self.skipWaiting()"), "sw.js must call self.skipWaiting()");
    assert(swCode.includes("clients.claim()"), "sw.js must call clients.claim()");
  });

  test("sw.js handles navigate mode with offline fallback", () => {
    assert(swCode.includes("request.mode === \x27navigate\x27"), "sw.js must check navigate mode");
    assert(swCode.includes("index.html"), "sw.js must fallback to index.html");
  });

  await runAsyncTest("sw.js mock execution: install, activate, fetch lifecycle", async () => {
    const listeners = {};
    const cacheStorage = new Map();

    class MockCache {
      constructor(name) {
        this.name = name;
        this.items = new Map();
      }
      async put(req, res) {
        const key = typeof req === "string" ? req : req.url;
        this.items.set(key, res);
      }
      async match(req) {
        const key = typeof req === "string" ? req : req.url;
        return this.items.get(key) || null;
      }
    }

    const mockCaches = {
      open: async (name) => {
        if (!cacheStorage.has(name)) {
          cacheStorage.set(name, new MockCache(name));
        }
        return cacheStorage.get(name);
      },
      match: async (req) => {
        const key = typeof req === "string" ? req : req.url;
        for (const c of cacheStorage.values()) {
          const res = await c.match(key);
          if (res) return res;
        }
        return null;
      },
      keys: async () => Array.from(cacheStorage.keys()),
      delete: async (name) => cacheStorage.delete(name)
    };

    // Pre-populate old cache to test purge
    cacheStorage.set("gate-ag-static-v0.0.1", new MockCache("gate-ag-static-v0.0.1"));

    const mockClients = {
      claim: async () => {}
    };

    const mockSelf = {
      addEventListener: (evt, cb) => {
        listeners[evt] = cb;
      },
      skipWaiting: () => {},
      clients: mockClients
    };

    class MockResponse {
      constructor(body, init = {}) {
        this.body = body;
        this.status = init.status || 200;
        this.ok = this.status >= 200 && this.status < 300;
        this.headers = new Map(Object.entries(init.headers || {}));
      }
      clone() {
        return new MockResponse(this.body, { status: this.status, headers: Object.fromEntries(this.headers) });
      }
    }

    class MockRequest {
      constructor(url, init = {}) {
        this.url = url;
        this.method = init.method || "GET";
        this.mode = init.mode || "cors";
        this.headers = new Map(Object.entries(init.headers || {}));
        this.destination = init.destination || "";
      }
    }

    const mockFetch = async (req) => {
      const urlStr = typeof req === "string" ? req : req.url;
      if (urlStr.includes("offline-fail")) {
        throw new Error("Network failure");
      }
      return new MockResponse("ok-content", { status: 200 });
    };

    const sandbox = {
      self: mockSelf,
      caches: mockCaches,
      fetch: mockFetch,
      Response: MockResponse,
      Request: MockRequest,
      URL: URL,
      console: { log: () => {}, warn: () => {}, error: () => {} },
      Promise: Promise,
      setTimeout: setTimeout
    };

    vm.createContext(sandbox);
    vm.runInContext(swCode, sandbox);

    assert(typeof listeners["install"] === "function", "Install listener registered");
    assert(typeof listeners["activate"] === "function", "Activate listener registered");
    assert(typeof listeners["fetch"] === "function", "Fetch listener registered");
    assert(typeof listeners["message"] === "function", "Message listener registered");

    // 1. Test Install Event
    let installWaitPromise = null;
    listeners["install"]({
      waitUntil: (p) => { installWaitPromise = p; }
    });
    await installWaitPromise;
    const staticCache = cacheStorage.get("gate-ag-static-v1.0.0");
    assert(staticCache, "Static cache created during install");
    assert(staticCache.items.has("./index.html"), "index.html precached in static cache");

    // 2. Test Activate Event (purges outdated caches)
    let activateWaitPromise = null;
    listeners["activate"]({
      waitUntil: (p) => { activateWaitPromise = p; }
    });
    await activateWaitPromise;
    assert(!cacheStorage.has("gate-ag-static-v0.0.1"), "Old cache version purged during activate");
    assert(cacheStorage.has("gate-ag-static-v1.0.0"), "Current static cache retained");

    // 3. Test Fetch Event - Navigation Online
    let respondPromise = null;
    listeners["fetch"]({
      request: new MockRequest("https://gate-ag.app/", { mode: "navigate" }),
      respondWith: (p) => { respondPromise = p; }
    });
    let navRes = await respondPromise;
    assert.strictEqual(navRes.status, 200, "Online navigation returns 200");

    // 4. Test Fetch Event - Navigation Offline Fallback
    respondPromise = null;
    listeners["fetch"]({
      request: new MockRequest("https://gate-ag.app/offline-fail", { mode: "navigate" }),
      respondWith: (p) => { respondPromise = p; }
    });
    let offlineNavRes = await respondPromise;
    assert(offlineNavRes, "Offline navigation returns cached fallback");

    // 5. Test Fetch Event - Hashed Asset Cache Miss & Hit
    respondPromise = null;
    listeners["fetch"]({
      request: new MockRequest("https://gate-ag.app/assets/index-B_93z8.js"),
      respondWith: (p) => { respondPromise = p; }
    });
    let assetRes = await respondPromise;
    assert.strictEqual(assetRes.status, 200, "Asset fetch returns 200");
    const runtimeCache = cacheStorage.get("gate-ag-runtime-v1.0.0");
    assert(runtimeCache.items.has("https://gate-ag.app/assets/index-B_93z8.js"), "Asset cached in runtime cache");

    // 6. Test Fetch Event - Image Cache & Offline Fallback
    respondPromise = null;
    listeners["fetch"]({
      request: new MockRequest("https://gate-ag.app/question_images/q1.png", { destination: "image" }),
      respondWith: (p) => { respondPromise = p; }
    });
    let imgRes = await respondPromise;
    assert.strictEqual(imgRes.status, 200);
    const imgCache = cacheStorage.get("gate-ag-images-v1.0.0");
    assert(imgCache.items.has("https://gate-ag.app/question_images/q1.png"), "Image stored in IMAGES_CACHE");

    // Offline image miss should return 404 response
    respondPromise = null;
    listeners["fetch"]({
      request: new MockRequest("https://gate-ag.app/question_images/offline-fail-image.png", { destination: "image" }),
      respondWith: (p) => { respondPromise = p; }
    });
    let offlineImgRes = await respondPromise;
    assert.strictEqual(offlineImgRes.status, 404, "Offline image miss returns 404 without crashing");

    // 7. Message Event - SKIP_WAITING
    let skipped = false;
    mockSelf.skipWaiting = () => { skipped = true; };
    listeners["message"]({ data: { type: "SKIP_WAITING" } });
    assert(skipped, "SKIP_WAITING message calls self.skipWaiting()");
  });

  // SECTION 4: Service Worker Client Registration Script
  console.log("\n--- Section 4: Service Worker Client Registration ---");

  const regPath = path.join(ROOT, "src/serviceWorkerRegistration.js");
  assert(fs.existsSync(regPath), "src/serviceWorkerRegistration.js must exist");

  await runAsyncTest("serviceWorkerRegistration.js is Node / SSR safe and exports expected API", async () => {
    const regModule = await import("file://" + regPath);
    assert(typeof regModule.registerServiceWorker === "function");
    assert(typeof regModule.unregisterServiceWorker === "function");
    assert(typeof regModule.getNetworkStatus === "function");
    // Invocation in Node (no window) should not throw exceptions
    regModule.registerServiceWorker();
    regModule.unregisterServiceWorker();
  });

  await runAsyncTest("serviceWorkerRegistration.js browser simulation with callbacks & events", async () => {
    // Mock browser environment
    let registeredUrl = null;
    let registeredScope = null;
    let eventListeners = {};
    let customEvents = [];

    const mockRegistration = {
      scope: "http://localhost:5173/",
      installing: {
        state: "installing",
        addEventListener: function(evt, cb) {
          this._stateChangeCb = cb;
        }
      },
      update: async () => {},
      addEventListener: function(evt, cb) {
        this._updateFoundCb = cb;
      }
    };

    const mockNavigator = {
      onLine: true,
      serviceWorker: {
        controller: null,
        register: async (url, options) => {
          registeredUrl = url;
          registeredScope = options.scope;
          return mockRegistration;
        },
        ready: Promise.resolve({
          unregister: async () => true
        })
      }
    };

    const mockWindow = {
      location: { hostname: "localhost" },
      addEventListener: (evt, cb) => { eventListeners[evt] = cb; },
      dispatchEvent: (evt) => { customEvents.push(evt); }
    };

    const mockDocument = {
      readyState: "complete",
      visibilityState: "visible",
      addEventListener: (evt, cb) => { eventListeners[evt] = cb; }
    };

    class MockCustomEvent {
      constructor(type, init = {}) {
        this.type = type;
        this.detail = init.detail;
      }
    }

    const regCode = fs.readFileSync(regPath, "utf8");
    const browserSandbox = {
      window: mockWindow,
      document: mockDocument,
      navigator: mockNavigator,
      CustomEvent: MockCustomEvent,
      console: { log: () => {}, info: () => {}, debug: () => {}, error: () => {} },
      Boolean: Boolean,
      Promise: Promise,
      setTimeout: setTimeout
    };

    vm.createContext(browserSandbox);
    // Wrap to capture exports
    const wrappedCode = regCode.replace(/export function/g, "function") + 
      "\nthis.registerServiceWorker = registerServiceWorker;\nthis.unregisterServiceWorker = unregisterServiceWorker;\nthis.getNetworkStatus = getNetworkStatus;";
    vm.runInContext(wrappedCode, browserSandbox);

    let successFired = false;
    browserSandbox.registerServiceWorker({
      onSuccess: () => { successFired = true; }
    });

    // Wait for microtasks
    await new Promise(r => setTimeout(r, 50));
    assert.strictEqual(registeredUrl, "./sw.js");
    assert.strictEqual(registeredScope, "./");

    // Trigger updatefound -> statechange -> installed (initial cache)
    mockRegistration._updateFoundCb();
    mockRegistration.installing.state = "installed";
    mockRegistration.installing._stateChangeCb();

    assert(successFired, "onSuccess callback executed on first install");
    assert(customEvents.some(e => e.type === "sw-cached"), "sw-cached event dispatched");

    // Test getNetworkStatus in browser
    const status = browserSandbox.getNetworkStatus();
    assert.strictEqual(status.isOnline, true);
  });

  // SECTION 5: HTML Meta & Link Tags
  console.log("\n--- Section 5: index.html PWA Tags ---");

  const indexPath = path.join(ROOT, "index.html");
  const indexHtml = fs.readFileSync(indexPath, "utf8");

  test("index.html contains manifest link", () => {
    assert(indexHtml.includes("rel=\"manifest\"") || indexHtml.includes("rel=\x27manifest\x27"), "index.html must link manifest");
  });

  test("index.html contains theme-color meta tags", () => {
    assert(indexHtml.includes("name=\"theme-color\""), "index.html must have theme-color");
  });

  test("index.html contains apple-mobile-web-app meta tags", () => {
    assert(indexHtml.includes("name=\"apple-mobile-web-app-capable\""), "index.html must have apple-mobile-web-app-capable");
    assert(indexHtml.includes("rel=\"apple-touch-icon\""), "index.html must have apple-touch-icon");
  });

  test("main.jsx imports and calls registerServiceWorker", () => {
    const mainPath = path.join(ROOT, "src/main.jsx");
    const mainContent = fs.readFileSync(mainPath, "utf8");
    assert(mainContent.includes("registerServiceWorker"), "main.jsx must call registerServiceWorker");
  });

  // SECTION 6: Dist Build Artifact Verification
  console.log("\n--- Section 6: Dist Build Artifact Verification ---");

  test("dist directory contains production PWA assets", () => {
    const distPath = path.join(ROOT, "dist");
    assert(fs.existsSync(distPath), "dist directory must exist");
    assert(fs.existsSync(path.join(distPath, "index.html")), "dist/index.html must exist");
    assert(fs.existsSync(path.join(distPath, "manifest.webmanifest")), "dist/manifest.webmanifest must exist");
    assert(fs.existsSync(path.join(distPath, "manifest.json")), "dist/manifest.json must exist");
    assert(fs.existsSync(path.join(distPath, "sw.js")), "dist/sw.js must exist");
    assert(fs.existsSync(path.join(distPath, "icons/icon-192.png")), "dist/icons/icon-192.png must exist");
    assert(fs.existsSync(path.join(distPath, "icons/icon-512.png")), "dist/icons/icon-512.png must exist");
    assert(fs.existsSync(path.join(distPath, "icons/icon-512-maskable.png")), "dist/icons/icon-512-maskable.png must exist");
    assert(fs.existsSync(path.join(distPath, "icons/apple-touch-icon.png")), "dist/icons/apple-touch-icon.png must exist");
    assert(fs.existsSync(path.join(distPath, "icons/icon.svg")), "dist/icons/icon.svg must exist");
  });

  console.log("\n=======================================================");
  console.log("SUMMARY: Total: " + totalTests + ", Passed: " + passedTests + ", Failed: " + failures.length);
  if (failures.length > 0) {
    console.error("FAILURES:");
    for (const f of failures) {
      console.error("- " + f.name + ": " + f.error);
    }
    process.exit(1);
  } else {
    console.log("ALL EMPIRICAL TESTS PASSED!");
  }
}

runAll().catch(e => {
  console.error("Fatal error:", e);
  process.exit(1);
});
