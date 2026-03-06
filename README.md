# Resume Parser and Job Matcher

This project is made for the assignment where the task was to build a simple Resume Parsing and Job Matching System without using any LLM or AI based parsing service.

I kept this project basic and normal on purpose so it stays easy to understand and easy to run.

## What this project does

This project takes:

- one resume file
- one or more job description files

Then it:

- reads the resume
- extracts basic details like name, salary, experience and skills
- reads the job description
- extracts role, salary, experience, required skills and optional skills
- checks which JD skills are present in the resume
- gives a matching score

At the end it prints the final result in JSON format in the terminal.

## Important assignment rule followed

This project does **not** use:

- ChatGPT API
- OpenAI API
- Gemini
- Claude
- any AI resume parser
- any LLM based SaaS

Only simple rule-based logic, regex, keyword matching and a PDF parser library are used.

## Tech used

- Node.js
- pdf-parse
- plain JavaScript

## What you need before running

You should have these things installed:

- Node.js
- npm

You can check with:

```bash
node -v
npm -v
```

If `npm` does not work in PowerShell because of script policy, then use `npm.cmd` instead.

## Project folder structure

```text
src/
  data/
  extractors/
  matchers/
  parsers/
  utils/
samples/
  resumes/
  jds/
```

## Install steps

Open terminal inside the project folder and run:

```bash
npm.cmd install
```

If your system allows normal npm, then this also works:

```bash
npm install
```

## How to run

### 1. Run with sample files

```bash
npm.cmd run sample
```

If `npm.cmd run sample` does not work for any reason, then run direct command:

```bash
node src/index.js samples/resumes/resume1.txt samples/jds/jd1.txt
```

### 2. Run with your own files

Syntax:

```bash
node src/index.js "resume-file-path" "jd-file-path"
```

Example:

```bash
node src/index.js "C:\Users\thsar\Downloads\Sarthak-Bhadauriya-resume.pdf" "samples/jds/assignment-jd.txt"
```

### 3. Run one resume against multiple JDs

```bash
node src/index.js "resume-file-path" "jd1-file-path" "jd2-file-path" "jd3-file-path"
```

Example:

```bash
node src/index.js "C:\Users\thsar\Downloads\Sarthak-Bhadauriya-resume.pdf" "samples/jds/jd1.txt" "samples/jds/assignment-jd.txt"
```

## Which file formats work

This project supports:

- `.txt`
- `.pdf`

For PDF files, `pdf-parse` package is used after install.

## Input example

### Resume input

Resume can contain things like:

- name
- skills
- salary
- experience
- education

### JD input

JD can contain things like:

- role
- required skills
- optional skills
- salary
- experience
- short role description

## Output format

Output comes in JSON format like this:

```json
{
  "name": "John Doe",
  "salary": "12 LPA",
  "yearOfExperience": 4.5,
  "resumeSkills": ["java", "mysql", "spring boot"],
  "matchingJobs": [
    {
      "jobId": "JD001",
      "role": "Backend Developer",
      "aboutRole": "Responsible for backend development.",
      "salary": "12 LPA",
      "yearOfExperience": 4,
      "requiredSkills": ["java", "mysql", "spring boot"],
      "optionalSkills": ["docker", "aws"],
      "skillsAnalysis": [
        { "skill": "java", "presentInResume": true },
        { "skill": "docker", "presentInResume": false }
      ],
      "matchingScore": 67
    }
  ]
}
```

## How matching score is calculated

Formula used:

```text
(Matched JD Skills / Total JD Skills) * 100
```

Example:

- total JD skills = 6
- matched skills = 4
- score = 66.67

In the project output it is rounded.

## Files you will mainly use

- `src/index.js` -> main file
- `src/parsers/resumeParser.js` -> resume parsing
- `src/parsers/jdParser.js` -> job description parsing
- `src/matchers/jobMatcher.js` -> matching logic
- `samples/` -> sample resume and JD files

## If you get error while running

### 1. npm is blocked in PowerShell

Use:

```bash
npm.cmd install
npm.cmd run sample
```

### 2. Only resume path was given

This project needs:

- 1 resume file
- at least 1 JD file

Wrong:

```bash
node src/index.js "resume.pdf"
```

Correct:

```bash
node src/index.js "resume.pdf" "jd.pdf"
```

### 3. File path issue

If file path has spaces, always use quotes:

```bash
node src/index.js "C:\Users\thsar\Downloads\My Resume.pdf" "C:\Users\thsar\Downloads\My JD.pdf"
```

## Notes

- This is a basic rule-based project
- It is not meant to be a production-level parser
- Extraction depends on text available inside the PDF or text file
- Some resumes may give partial extraction because resume formats are different

## Author

**Sarthak Bhadauriya**  
**Full Stack Developer**
