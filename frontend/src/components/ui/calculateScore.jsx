export function calculateScore(resumeText, jobDescription) {
    // Extract important keywords from job description
    const keywords = extractKeywords(jobDescription);
  
    // Convert resume text to lowercase for case-insensitive matching
    const lowerResumeText = resumeText.toLowerCase();
  
    // Find matched and missing keywords
    const matchedKeywords = keywords.filter(keyword =>
      lowerResumeText.includes(keyword.toLowerCase())
    );
  
    const missingKeywords = keywords.filter(keyword =>
      !lowerResumeText.includes(keyword.toLowerCase())
    );
  
    // Calculate score
    const score = Math.round((matchedKeywords.length / keywords.length) * 100) || 0;
  
    return {
      score,
      matchedKeywords,
      missingKeywords
    };
  }
  
  function extractKeywords(jobDescription) {
    // Convert to lowercase and remove special characters
    const cleanText = jobDescription.toLowerCase().replace(/[^\w\s]/g, ' ');
  
    // Split into words
    const words = cleanText.split(/\s+/);
  
    // Filter common words and short terms
    const commonWords = new Set([
      'and', 'or', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'it', 'that', 
      'this', 'which', 'as', 'be', 'been', 'are', 'was', 'were', 'has', 'have', 'had', 'from', 'but', 'not', 
      'would', 'should', 'could', 'can', 'may', 'might', 'must', 'do', 'does', 'did', 'being', 'other', 'will', 
      'written', 'create', 'what', 'how', 'when', 'where', 'why', 'who', 'whom', 'whose', 'some', 'any', 'each', 
      'every', 'more', 'most', 'many', 'such', 'if', 'then', 'than', 'so', 'thus', 'therefore', 'hence', 
      'about', 'via', 'between', 'into', 'upon', 'over', 'under', 'since', 'while', 'because', 'due', 'although', 
      'throughout', 'within', 'without', 'around', 'among', 'before', 'after', 'across', 'toward', 'towards', 
      'against', 'like', 'unlike', 'whether', 'until', 'unless', 'whereas', 'whereby', 'wherein', 'now', 'then', 
      'always', 'never', 'sometimes', 'often', 'less', 'few', 'several', 'none', 'own', 'same', 'different', 'various'
  ]);
      const keywords = words.filter(word =>
      word.length > 2 && !commonWords.has(word)
    );
  
    // Count frequency and get unique keywords
    const frequency = {};
    keywords.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });
  
    // Sort by frequency and get top keywords
    return Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 50)
      .map(([word]) => word);
  }
  