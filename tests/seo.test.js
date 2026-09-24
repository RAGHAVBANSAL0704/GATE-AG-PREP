import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { getPageMetadata, updatePageSEO, TAB_SEO_CONFIG, BASE_SITE_URL } from '../src/utils/seo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const publicDir = path.join(projectRoot, 'public');
const robotsPath = path.join(publicDir, 'robots.txt');
const sitemapPath = path.join(publicDir, 'sitemap.xml');
const openSearchPath = path.join(publicDir, 'opensearch.xml');
const indexHtmlPath = path.join(projectRoot, 'index.html');

describe('SEO Subsystem & Search Engine Discoverability Test Suite', () => {

  describe('robots.txt Directives Audit', () => {
    it('ensures robots.txt exists in public directory with non-zero size', () => {
      assert.ok(fs.existsSync(robotsPath), 'robots.txt must exist in public directory');
      const stat = fs.statSync(robotsPath);
      assert.ok(stat.size > 20, 'robots.txt must have meaningful content');
    });

    it('contains standard User-agent, Allow, and Sitemap directives', () => {
      const robotsContent = fs.readFileSync(robotsPath, 'utf8');
      assert.ok(robotsContent.includes('User-agent: *'), 'Must specify wildcard user-agent');
      assert.ok(robotsContent.includes('Allow: /'), 'Must allow root indexing');
      assert.ok(robotsContent.includes('Sitemap: https://gate-ag-prep.vercel.app/sitemap.xml'), 'Must link to XML sitemap');
    });

    it('contains search crawler directives for Googlebot, Bingbot, and Applebot', () => {
      const robotsContent = fs.readFileSync(robotsPath, 'utf8');
      assert.ok(robotsContent.includes('User-agent: Googlebot'), 'Must explicitly mention Googlebot');
      assert.ok(robotsContent.includes('User-agent: Bingbot'), 'Must explicitly mention Bingbot');
      assert.ok(robotsContent.includes('User-agent: Applebot'), 'Must explicitly mention Applebot');
      assert.ok(robotsContent.includes('Host: gate-ag-prep.vercel.app'), 'Must declare canonical host per RFC syntax');
    });

    it('permits modern AI search and answer engines (GPTBot, PerplexityBot, Claude-Web)', () => {
      const robotsContent = fs.readFileSync(robotsPath, 'utf8');
      assert.ok(robotsContent.includes('User-agent: GPTBot'), 'Must mention GPTBot');
      assert.ok(robotsContent.includes('User-agent: PerplexityBot'), 'Must mention PerplexityBot');
      assert.ok(robotsContent.includes('User-agent: Claude-Web'), 'Must mention Claude-Web');
    });
  });

  describe('sitemap.xml Structural Audit', () => {
    it('ensures sitemap.xml exists in public directory', () => {
      assert.ok(fs.existsSync(sitemapPath), 'sitemap.xml must exist in public directory');
    });

    it('validates sitemap XML schema and namespace', () => {
      const sitemap = fs.readFileSync(sitemapPath, 'utf8');
      assert.ok(sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), 'Must include XML declaration');
      assert.ok(sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'), 'Must define sitemap 0.9 schema');
      assert.ok(sitemap.includes('</urlset>'), 'Must have closing urlset tag');
    });

    it('contains all essential routes with valid priorities and changefreq', () => {
      const sitemap = fs.readFileSync(sitemapPath, 'utf8');
      const expectedLocations = [
        'https://gate-ag-prep.vercel.app/',
        'https://gate-ag-prep.vercel.app/mocktest',
        'https://gate-ag-prep.vercel.app/practicehub',
        'https://gate-ag-prep.vercel.app/practice',
        'https://gate-ag-prep.vercel.app/formulas',
        'https://gate-ag-prep.vercel.app/syllabus',
        'https://gate-ag-prep.vercel.app/learninghub',
        'https://gate-ag-prep.vercel.app/simulators',
        'https://gate-ag-prep.vercel.app/flashcards',
        'https://gate-ag-prep.vercel.app/downloads',
        'https://gate-ag-prep.vercel.app/community',
        'https://gate-ag-prep.vercel.app/livestats'
      ];

      expectedLocations.forEach(loc => {
        assert.ok(sitemap.includes(`<loc>${loc}</loc>`), `Sitemap missing location: ${loc}`);
      });

      assert.ok(sitemap.includes('<priority>1.0</priority>'), 'Root portal must have 1.0 priority');
      assert.ok(sitemap.includes('<priority>0.95</priority>'), 'Mock tests must have 0.95 priority');
      assert.ok(sitemap.includes('<changefreq>daily</changefreq>'), 'Must include daily change frequency');
    });

    it('ensures sitemap contains NO illegal hash fragment identifiers (#)', () => {
      const sitemap = fs.readFileSync(sitemapPath, 'utf8');
      const locMatches = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
      assert.ok(locMatches.length >= 10, 'Must have at least 10 sitemap URLs');
      locMatches.forEach(loc => {
        assert.ok(!loc.includes('#'), `Sitemap URL must not contain '#' fragment per Sitemaps.org spec: ${loc}`);
      });
    });
  });

  describe('OpenSearch XML Engine Audit', () => {
    it('ensures opensearch.xml exists with valid XML definition', () => {
      assert.ok(fs.existsSync(openSearchPath), 'opensearch.xml must exist in public directory');
      const content = fs.readFileSync(openSearchPath, 'utf8');
      assert.ok(content.includes('<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">'));
      assert.ok(content.includes('<ShortName>GATE AG Prep</ShortName>'));
      assert.ok(content.includes('template="https://gate-ag-prep.vercel.app/practice?q={searchTerms}"'));
    });
  });

  describe('HTML Entrypoint (index.html) SEO Audit', () => {
    const html = fs.readFileSync(indexHtmlPath, 'utf8');

    it('validates canonical link tag and hreflang alternatives', () => {
      assert.ok(html.includes('<link rel="canonical" href="https://gate-ag-prep.vercel.app/" />'), 'index.html must include canonical link');
      assert.ok(html.includes('hreflang="en-IN"'), 'Must include en-IN hreflang alternate');
      assert.ok(html.includes('hreflang="x-default"'), 'Must include x-default hreflang alternate');
    });

    it('validates performance preconnect and dns-prefetch resource hints', () => {
      assert.ok(html.includes('rel="dns-prefetch" href="https://fonts.googleapis.com"'), 'Must include dns-prefetch for fonts api');
      assert.ok(html.includes('rel="dns-prefetch" href="https://fonts.gstatic.com"'), 'Must include dns-prefetch for font gstatic');
    });

    it('validates comprehensive meta tags for search engines', () => {
      assert.ok(html.includes('name="description"'), 'Must have description meta');
      assert.ok(html.includes('name="keywords"'), 'Must have keywords meta');
      assert.ok(html.includes('name="robots"'), 'Must have robots directive meta');
      assert.ok(html.includes('name="googlebot"'), 'Must have googlebot directive meta');
      assert.ok(html.includes('name="author"'), 'Must have author meta');
      assert.ok(html.includes('Agricultural Engineering'), 'Description or keywords must target Agricultural Engineering');
    });

    it('validates Open Graph (OG) social sharing metadata', () => {
      assert.ok(html.includes('property="og:type" content="website"'), 'Must have og:type');
      assert.ok(html.includes('property="og:site_name" content="GATE AG Prep Portal"'), 'Must have og:site_name');
      assert.ok(html.includes('property="og:title"'), 'Must have og:title');
      assert.ok(html.includes('property="og:description"'), 'Must have og:description');
      assert.ok(html.includes('property="og:url" content="https://gate-ag-prep.vercel.app/"'), 'Must have og:url');
      assert.ok(html.includes('property="og:image"'), 'Must have og:image');
    });

    it('validates Twitter Cards metadata', () => {
      assert.ok(html.includes('name="twitter:card" content="summary"'), 'Must have twitter:card');
      assert.ok(html.includes('name="twitter:title"'), 'Must have twitter:title');
      assert.ok(html.includes('name="twitter:description"'), 'Must have twitter:description');
      assert.ok(html.includes('name="twitter:image"'), 'Must have twitter:image');
    });

    it('validates Schema.org JSON-LD structured data with FAQPage, BreadcrumbList, WebSite, WebApp, Course, and ItemList', () => {
      const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
      assert.ok(match, 'index.html must contain ld+json script tag');

      let parsed;
      assert.doesNotThrow(() => {
        parsed = JSON.parse(match[1]);
      }, 'Schema.org JSON-LD must be valid JSON');

      assert.strictEqual(parsed['@context'], 'https://schema.org');
      assert.ok(Array.isArray(parsed['@graph']), '@graph array required');

      const types = parsed['@graph'].map(item => item['@type']);
      assert.ok(types.includes('WebSite'), 'Must include WebSite schema');
      assert.ok(types.includes('WebApplication'), 'Must include WebApplication schema');
      assert.ok(types.includes('Course'), 'Must include Course schema');
      assert.ok(types.includes('BreadcrumbList'), 'Must include BreadcrumbList schema');
      assert.ok(types.includes('FAQPage'), 'Must include FAQPage schema');
      assert.ok(types.includes('ItemList'), 'Must include ItemList site navigation schema');

      const webApp = parsed['@graph'].find(item => item['@type'] === 'WebApplication');
      assert.strictEqual(webApp.applicationCategory, 'EducationalApplication');
      assert.strictEqual(webApp.offers.price, '0');

      const faq = parsed['@graph'].find(item => item['@type'] === 'FAQPage');
      assert.ok(Array.isArray(faq.mainEntity), 'FAQPage must contain mainEntity array');
      assert.ok(faq.mainEntity.length >= 3, 'FAQPage must contain at least 3 FAQ items');
    });

    it('ensures noscript crawler and accessibility fallback exists with detailed syllabus and scoring table', () => {
      assert.ok(html.includes('<noscript>'), 'Must include <noscript> fallback');
      assert.ok(html.includes('1,324 Official GATE AG PYQs'), 'Noscript should highlight key resources');
      assert.ok(html.includes('General Aptitude'), 'Noscript should outline General Aptitude');
      assert.ok(html.includes('65 Questions'), 'Noscript should display total questions count');
    });
  });

  describe('Dynamic SEO Utility (src/utils/seo.js) Unit Tests', () => {
    it('returns dedicated metadata with contextual keywords and clean canonical URLs', () => {
      const dashboardMeta = getPageMetadata('dashboard');
      assert.ok(dashboardMeta.title.includes('GATE AG Prep Portal'));
      assert.strictEqual(dashboardMeta.canonicalUrl, `${BASE_SITE_URL}/`);
      assert.ok(dashboardMeta.keywords.includes('Farm Power'));

      const mockMeta = getPageMetadata('mocktest');
      assert.ok(mockMeta.title.includes('Mock Tests'));
      assert.strictEqual(mockMeta.canonicalUrl, `${BASE_SITE_URL}/mocktest`);
      assert.ok(mockMeta.keywords.includes('TCS iON'));

      const formulasMeta = getPageMetadata('formulas');
      assert.ok(formulasMeta.title.includes('Formula Sheet'));
      assert.strictEqual(formulasMeta.canonicalUrl, `${BASE_SITE_URL}/formulas`);
      assert.ok(formulasMeta.keywords.includes('Darcy law'));

      const syllabusMeta = getPageMetadata('syllabus');
      assert.ok(syllabusMeta.title.includes('Syllabus Tracker'));
      assert.strictEqual(syllabusMeta.canonicalUrl, `${BASE_SITE_URL}/syllabus`);
      assert.ok(syllabusMeta.keywords.includes('181 subtopics'));
    });

    it('ensures all canonical URLs are free of fragment identifiers (#)', () => {
      Object.keys(TAB_SEO_CONFIG).forEach(tab => {
        const meta = getPageMetadata(tab);
        assert.ok(!meta.canonicalUrl.includes('#'), `Canonical URL for tab "${tab}" must not contain '#' fragment: ${meta.canonicalUrl}`);
      });
    });

    it('identifies admin tabs as noindex to protect internal routes', () => {
      const adminMeta = getPageMetadata('admin');
      assert.strictEqual(adminMeta.noindex, true, 'Admin tab must be flagged as noindex');

      const creatorMeta = getPageMetadata('creator');
      assert.strictEqual(creatorMeta.noindex, true, 'Creator HQ must be flagged as noindex');
    });

    it('handles unknown or empty tab gracefully by falling back to dashboard metadata', () => {
      const fallbackMeta = getPageMetadata('non_existent_tab_xyz');
      assert.strictEqual(fallbackMeta.title, TAB_SEO_CONFIG.dashboard.title);
      assert.strictEqual(fallbackMeta.canonicalUrl, `${BASE_SITE_URL}/`);

      const emptyMeta = getPageMetadata('');
      assert.strictEqual(emptyMeta.title, TAB_SEO_CONFIG.dashboard.title);
    });

    it('safely runs updatePageSEO in SSR / Node environment without throwing', () => {
      assert.doesNotThrow(() => {
        updatePageSEO('mocktest');
        updatePageSEO('admin');
        updatePageSEO('dashboard');
      });
    });

    it('updates DOM title, meta description, keywords, robots, and JSON-LD Breadcrumbs', () => {
      const fakeElements = {};
      const fakeHead = {
        appendChild(el) {
          const key = el.id || (el.tagName + ':' + (el.getAttribute('name') || el.getAttribute('property') || el.getAttribute('rel')));
          fakeElements[key] = el;
        }
      };

      const originalDocument = global.document;
      try {
        global.document = {
          title: '',
          head: fakeHead,
          createElement(tag) {
            const attrs = {};
            let innerText = '';
            return {
              tagName: tag.toUpperCase(),
              setAttribute(k, v) { attrs[k] = v; },
              getAttribute(k) { return attrs[k]; },
              set id(val) { attrs['id'] = val; },
              get id() { return attrs['id']; },
              set textContent(val) { innerText = val; },
              get textContent() { return innerText; },
              attrs
            };
          },
          getElementById(id) {
            return fakeElements[id] || null;
          },
          querySelector(sel) {
            const matchName = sel.match(/name="([^"]+)"/);
            const matchProp = sel.match(/property="([^"]+)"/);
            const matchRel = sel.match(/rel="([^"]+)"/);
            const key = 'META:' + (matchName ? matchName[1] : (matchProp ? matchProp[1] : (matchRel ? matchRel[1] : '')));
            return fakeElements[key] || null;
          }
        };

        updatePageSEO('practice');
        assert.ok(global.document.title.includes('Practice Pool'));

        updatePageSEO('admin');
        const robotsEl = global.document.querySelector('meta[name="robots"]');
        assert.ok(robotsEl, 'Robots meta should exist');
        assert.ok(robotsEl.getAttribute('content').includes('noindex'), 'Admin tab must update robots to noindex');

        // Check dynamic JSON-LD breadcrumb script
        const breadcrumbEl = global.document.getElementById('seo-breadcrumb-jsonld');
        assert.ok(breadcrumbEl, 'Breadcrumb JSON-LD script must exist');
        const breadcrumbJson = JSON.parse(breadcrumbEl.textContent);
        assert.strictEqual(breadcrumbJson['@type'], 'BreadcrumbList');
        assert.ok(Array.isArray(breadcrumbJson.itemListElement));
      } finally {
        global.document = originalDocument;
      }
    });
  });

  describe('Component Headings & Semantic Document Outline Audit', () => {
    it('verifies Dashboard has a primary semantic h1 tag', () => {
      const dashboardPath = path.join(projectRoot, 'src/components/Dashboard.jsx');
      const content = fs.readFileSync(dashboardPath, 'utf8');
      assert.ok(content.includes('<h1'), 'Dashboard must contain a primary h1 heading');
    });

    it('verifies FormulaSheet has a primary semantic h1 tag', () => {
      const formulaPath = path.join(projectRoot, 'src/components/FormulaSheet.jsx');
      const content = fs.readFileSync(formulaPath, 'utf8');
      assert.ok(content.includes('<h1'), 'FormulaSheet must contain a primary h1 heading');
    });

    it('verifies SyllabusTracker has a primary semantic h1 tag', () => {
      const syllabusPath = path.join(projectRoot, 'src/components/SyllabusTracker.jsx');
      const content = fs.readFileSync(syllabusPath, 'utf8');
      assert.ok(content.includes('<h1'), 'SyllabusTracker must contain a primary h1 heading');
    });

    it('verifies MockTestMode has a primary semantic h1 tag', () => {
      const mockTestPath = path.join(projectRoot, 'src/components/MockTestMode.jsx');
      const content = fs.readFileSync(mockTestPath, 'utf8');
      assert.ok(content.includes('<h1'), 'MockTestMode must contain a primary h1 heading');
    });

    it('verifies DownloadsHub has a primary semantic h1 tag', () => {
      const downloadsPath = path.join(projectRoot, 'src/components/DownloadsHub.jsx');
      const content = fs.readFileSync(downloadsPath, 'utf8');
      assert.ok(content.includes('<h1'), 'DownloadsHub must contain a primary h1 heading');
    });

    it('verifies PracticeHub has a primary semantic h1 tag', () => {
      const practicePath = path.join(projectRoot, 'src/components/PracticeHub.jsx');
      const content = fs.readFileSync(practicePath, 'utf8');
      assert.ok(content.includes('<h1'), 'PracticeHub must contain a primary h1 heading');
    });
  });

});
