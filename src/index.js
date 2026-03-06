const path = require("path");
const { extractText } = require("./extractors/textExtractor");
const { parseResume } = require("./parsers/resumeParser");
const { parseJobDescription } = require("./parsers/jdParser");
const { matchResumeWithJob } = require("./matchers/jobMatcher");

async function main() {
  const resumeFile = process.argv[2];
  const jobFiles = process.argv.slice(3);

  if (!resumeFile || jobFiles.length === 0) {
    console.log("Usage: node src/index.js <resume-file> <jd-file-1> [jd-file-2] [jd-file-3]");
    console.log("Example: npm run sample");
    process.exit(1);
  }

  const resumeFullPath = path.resolve(resumeFile);
  const resumeRawText = await extractText(resumeFullPath);
  const parsedResume = parseResume(resumeRawText);
  const jobs = [];

  for (let i = 0; i < jobFiles.length; i += 1) {
    const currentJobPath = path.resolve(jobFiles[i]);
    const currentJobText = await extractText(currentJobPath);
    const currentJob = parseJobDescription(currentJobText, `JD${String(i + 1).padStart(3, "0")}`);
    const currentMatch = matchResumeWithJob(parsedResume, currentJob);
    jobs.push(currentMatch);
  }

  const finalData = {
    ...parsedResume,
    matchingJobs: jobs
  };

  console.log(JSON.stringify(finalData, null, 2));
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
