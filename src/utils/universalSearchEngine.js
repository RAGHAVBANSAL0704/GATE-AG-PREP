/**
 * Universal 4-Way Knowledge Search Engine for GATE Agricultural Engineering
 * Aggregates and indexes:
 * 1. Concepts (concepts.json)
 * 2. Formulas (formulas.js)
 * 3. Flashcards (flashcardsData.js)
 * 4. Official GATE AG PYQs (passed questions pool)
 */

import conceptsData from '../data/conceptsData.js';
import { GATE_AG_FORMULAS } from '../data/formulas.js';
import { GATE_AG_FLASHCARDS } from '../data/flashcardsData.js';

export function executeUniversalSearch({
  query = '',
  questions = [],
  categoryFilter = 'all', // 'all', 'concepts', 'formulas', 'flashcards', 'questions'
  maxResults = 40
}) {
  const cleanQuery = (query || '').trim().toLowerCase();
  if (!cleanQuery) {
    return {
      results: [],
      counts: { all: 0, concepts: 0, formulas: 0, flashcards: 0, questions: 0 }
    };
  }

  const queryTerms = cleanQuery.split(/\s+/).filter(t => t.length > 0);

  const matchesTerm = (text) => {
    if (!text) return false;
    const str = String(text).toLowerCase();
    return queryTerms.every(term => str.includes(term));
  };

  // 1. Search Concepts
  const matchedConcepts = conceptsData
    .filter(item => 
      matchesTerm(item.title) || 
      matchesTerm(item.topic) || 
      matchesTerm(item.section) || 
      matchesTerm(item.content) ||
      (item.formulas && item.formulas.some(f => matchesTerm(f)))
    )
    .map(item => ({
      id: item.id || `concept_${item.title}`,
      type: 'concepts',
      typeLabel: 'Concept Note',
      title: item.title,
      subtitle: `${item.section} • ${item.topic || ''}`,
      snippet: item.content ? item.content.slice(0, 180).replace(/[#*`$]/g, '') + '...' : '',
      raw: item
    }));

  // 2. Search Formulas
  const matchedFormulas = [];
  (GATE_AG_FORMULAS || []).forEach(cat => {
    (cat.topics || []).forEach(topic => {
      (topic.formulas || []).forEach((f, idx) => {
        if (
          matchesTerm(f.title) || 
          matchesTerm(f.equation) || 
          matchesTerm(f.explanation) || 
          matchesTerm(topic.topicName) || 
          matchesTerm(cat.category)
        ) {
          matchedFormulas.push({
            id: `formula_${cat.category}_${topic.topicName}_${idx}`,
            type: 'formulas',
            typeLabel: 'Formula',
            title: f.title,
            subtitle: `${cat.category} • ${topic.topicName}`,
            snippet: f.explanation || f.equation,
            raw: { ...f, category: cat.category, topicName: topic.topicName }
          });
        }
      });
    });
  });

  // 3. Search Flashcards
  const matchedFlashcards = (GATE_AG_FLASHCARDS || [])
    .filter(fc => matchesTerm(fc.question) || matchesTerm(fc.answer) || matchesTerm(fc.topic))
    .map(fc => ({
      id: fc.cardId,
      type: 'flashcards',
      typeLabel: 'Flashcard',
      title: fc.question,
      subtitle: `Topic: ${fc.topic}`,
      snippet: `Answer: ${fc.answer}`,
      raw: fc
    }));

  // 4. Search Official GATE AG PYQs
  const matchedQuestions = (questions || [])
    .filter(q => 
      matchesTerm(q.question) || 
      matchesTerm(q.section) || 
      matchesTerm(q.topic) || 
      matchesTerm(q.subtopic) ||
      matchesTerm(String(q.year))
    )
    .slice(0, 20) // Limit raw questions to avoid overwhelming
    .map(q => ({
      id: q.id || `q_${q.year}_${q.question_number}`,
      type: 'questions',
      typeLabel: `GATE AG ${q.year || ''} PYQ`,
      title: `Q${q.question_number || ''} (${q.year || ''}) • ${q.section || ''}`,
      subtitle: `${q.topic || ''} • ${q.type || 'MCQ'} [${q.marks || 1} Mark]`,
      snippet: q.question ? q.question.slice(0, 160).replace(/[#*`$]/g, '') + '...' : '',
      raw: q
    }));

  const counts = {
    all: matchedConcepts.length + matchedFormulas.length + matchedFlashcards.length + matchedQuestions.length,
    concepts: matchedConcepts.length,
    formulas: matchedFormulas.length,
    flashcards: matchedFlashcards.length,
    questions: matchedQuestions.length
  };

  let results = [];
  if (categoryFilter === 'all') {
    results = [...matchedConcepts, ...matchedFormulas, ...matchedFlashcards, ...matchedQuestions];
  } else if (categoryFilter === 'concepts') {
    results = matchedConcepts;
  } else if (categoryFilter === 'formulas') {
    results = matchedFormulas;
  } else if (categoryFilter === 'flashcards') {
    results = matchedFlashcards;
  } else if (categoryFilter === 'questions') {
    results = matchedQuestions;
  }

  return {
    results: results.slice(0, maxResults),
    counts
  };
}
