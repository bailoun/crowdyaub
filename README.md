1. Project Overview
Crowdyaub.com is a web application designed to monitor crowd levels across various locations on the AUB campus in real time. Leveraging the university’s Wi-Fi network, it provides students and faculty with valuable information about crowd density, helping them make informed decisions about where to go on campus. This project addresses the problem of overcrowded spaces, making campus navigation smoother and reducing wait times in congested areas.

2. Installation
Prerequisites:
Node.js: Ensure that Node.js is installed on your system. You can download it from here.
AWS CLI: Set up the AWS Command Line Interface for managing AWS resources. Instructions can be found here.
DynamoDB: The backend uses DynamoDB for data storage, so ensure your AWS account is set up with DynamoDB access.
Setup:
Clone the Repository:

bash
Copy code
git clone https://github.com/yourusername/crowdyaub.com.git
cd crowdyaub.com
Install Dependencies:

bash
Copy code
npm install
Set up Environment Variables:

Create a .env file in the root directory with your AWS credentials and other necessary configurations:
bash
Copy code
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
DYNAMO_DB_TABLE_NAME=your_table_name
API_URL=https://yourapiurl.com
Deploy to AWS:
Use AWS SAM or the Serverless Framework to deploy the Lambda functions and other AWS resources:

bash
Copy code
sam build
sam deploy --guided
Run the Application Locally:

bash
Copy code
npm start
3. Usage
Access the Website: Once deployed, navigate to https://www.crowdyaub.com to access the application.
Real-Time Crowd Monitoring: The website shows live data on crowd levels at different campus locations. Use the filters to view specific areas or times.

4. Contribution Guidelines
We welcome contributions! Here's how you can contribute:

Fork the repository.
Create a new branch for your feature or bugfix:
bash
Copy code
git checkout -b feature/your-feature-name
Write tests for your code and ensure all existing tests pass.
Submit a pull request with a clear description of your changes.
Please follow our coding standards and ensure all contributions are well-documented.

5. License
This project is licensed under the MIT License.

6. Troubleshooting and FAQs
Common Issues:
Deployment Errors: Ensure your AWS credentials are correctly configured and you have the necessary permissions.
API Not Responding: Check if your API Gateway and Lambda functions are correctly deployed and associated with the right CORS settings.
FAQs:
How accurate is the crowd data?

The data is based on Wi-Fi connections and may vary slightly due to device connectivity.
Can I contribute to improving the AI model?

Yes! We're always looking for collaborators to enhance the machine learning model. Please check the Contribution Guidelines.
7. Credits
This project was developed by Mohamad Bailoun, Ghanem El Zein, Rami El Khatib , and Sara Houeidi under the guidance of several Amazon engineers, including Suraj Nair, Gosia Szczepaniak and Hassan Bayloun. Special thanks to the Amazon engineers for their mentorship, and to the WIE club in AUB for this opportunity. We also acknowledge the use of AWS services, DynamoDB, and various open-source libraries.

8. Contact Information
For any questions, feedback, or support, please reach out to us at:

Email: mail@crowdyaub.com
Personal Emails: Mohamad Bailoun: mmb84@mail.aub.edu
		 Ghanem El Zein: gae20@mail.aub.edu
		 Rami El Khatib: rra77@mail.aub.edu
		 Sara Houeidi: ssh50@mail.aub.edu

GitHub: https://github.com/bailoun
	https://github.com/ghanemzein