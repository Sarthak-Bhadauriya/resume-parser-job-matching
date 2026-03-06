function calculateMatchingScore(resumeSkills, jdSkills) {
  if (!jdSkills.length) {
    return 0;
  }

  const resumeSet = new Set(resumeSkills);
  const matchedCount = jdSkills.filter((skill) => resumeSet.has(skill)).length;

  return Math.round((matchedCount / jdSkills.length) * 100);
}

module.exports = {
  calculateMatchingScore
};
