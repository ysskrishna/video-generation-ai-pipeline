## Overview
Design and implement a web application that allows users to upload an image and receive a generated video based on that image. The system must handle the constraints of limited memory and simulate an artificial intelligence (AI) model that is resource-intensive and has a fixed processing time.
## Requirements
1. Image Upload:
  - Users of our system should be able to upload an image via a web interface.
  - The user upload frequency is higher than the model processing speed.
  - Users should be able to see the current status of their video generation task. While processing, they should be able to see the percentage progress in real-time.
2. Simulated AI Model:
  - Simulate the workflow of an AI model that processes each image to generate a video.
  - The AI model should take 30 seconds to process an image.
  - The model can only process one image at a time.
  - You may use a sleep function to simulate the processing time.
3. Generated Video:
  - After processing, the system should generate a video based on the uploaded image.
  - The video should be viewable on the web interface.
  - The video should be read-only; users should not be able to download it.
## Recommended Technologies
- Frontend: React / Next.js, Typescript, ...
- Backend: Python (Fast API, Flask, ...)
- Technology Flexibility: Feel free to use any technologies not listed above
## Guidelines 
1. Flexibility for Backend Engineers: The frontend is solely for testing purposes and can only include image upload, status and progress display, and video preview features. Lack of UI/UX or advanced frontend techniques will not be a point of deduction.
2. Input and Output: Please select any example images and videos for the demonstration; no knowledge of AI models is required.
3. Creative Freedom: For any aspects not mentioned in this document, you are free to improvise as long as you meet the requirements listed.
4. Use of Third-Party Packages: You are welcome to use any third-party packages that you think are useful.
5. Choice of Technology: You can use any version of the programming languages and frameworks that you prefer.
6. Time Investment: You are expected to spend approximately 3-4 hours completing this task. We respect your time, so please do not feel obligated to work on it for longer than this.
7. Imperfection Acceptance: No piece of software is perfect. Feel free to document any additional functionality you would add or things you might do differently in the github ReadMe.
8. Submission Deadline: You have one week to complete your solution from the time you receive this document. If we do not receive your solution within one week and have not heard from you, we will assume you are no longer interested in the role. Please ping us on Wellfound if you need more time.
9. Extra Time Utilization: If you find yourself with extra time, feel free to include tests or address any performance concerns.
10. Questions: If you have any questions related to the requirement, please feel free to comment on this document!
## Deliverables
- Please email info@leylinepro.com with a link to a public repository. In the subject line, please include your full name followed by "Technical Challenge" (e.g. "Leslie Lamport - Backend Technical Challenge").
- Please include all the code that constitutes your project. We will re-run your code during review. To make our reviewer's life easier, we require that you use docker.
- Please include a README file with any information you think is relevant for running and understanding your code. Optionally, you can enhance the quality/detail of your README with a short video (<5 minutes), such as a Loom or a YouTube video link, where you share your screen and explain your solution.