# Runes Recognition Project: QA Guide and Setup Instructions

## Table of Contents

1. Project Overview
2. Setup Instructions
   - Backend Setup
   - Frontend Setup
3. Running the Application
4. Testing Instructions
5. QA Checklist
6. Troubleshooting Guide

## 1. Project Overview

The Runes Recognition project is a web application that allows users to upload, manage, and recognize rune images. It consists of a FastAPI backend and a React frontend.

Key Features:

- User registration and authentication
- Rune image upload and management
- Rune recognition using image processing techniques
- Admin functionality for user management

The Runes Recognition project consists of two separate applications:

1. Backend API (FastAPI)
2. Frontend Web Application (React)

## 2. Setup Instructions

### Backend Setup

1. Clone the backend repository:

   ```
   git clone <backend_repo_url>
   cd runes_recognition_backend
   ```

2. Create and activate a virtual environment:

   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:

   ```
   pip install -r requirements.txt
   ```

4. Set up the database:

   ```
   alembic upgrade head
   ```

5. Start the backend server:
   ```
   uvicorn main:app --reload
   ```

The backend will be available at `http://localhost:8000`.

### Frontend Setup

1. Clone the frontend repository:

   ```
   git clone <frontend_repo_url>
   cd runes_recognition_frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

The frontend will be available at `http://localhost:3000`.

## 4. Testing Instructions

### Backend Testing

```
cd runes_recognition_backend
pytest
```

### Frontend Testing

```
cd runes_recognition_frontend
npm test
```

### Manual Testing

Use the Postman collection provided to test backend endpoints. For frontend testing, follow the QA checklist below.

## 5. QA Checklist

### User Authentication

- [ ] User can register with a unique username and email
- [ ] User can log in with correct credentials
- [ ] User cannot log in with incorrect credentials
- [ ] User can log out
- [ ] Authenticated user can access protected routes
- [ ] Unauthenticated user is redirected to login page for protected routes

### Rune Management

- [ ] User can view a list of their runes
- [ ] User can create a new rune by uploading an image and providing a linked URL
- [ ] User can edit the linked URL of an existing rune
- [ ] User can delete their own rune
- [ ] Pagination works correctly in the rune list
- [ ] Rune list displays correct total count

### Admin Functionality

- [ ] Admin can view a list of all users
- [ ] Admin can change a user's role
- [ ] Admin can view and manage all runes

### Rune Recognition

- [ ] System correctly processes uploaded rune images
- [ ] System can match a rune image to existing runes in the database
- [ ] System returns appropriate similarity scores for matched runes

### Error Handling

- [ ] Appropriate error messages are displayed for invalid inputs
- [ ] Server errors are handled gracefully and informative messages are shown to the user

### Performance

- [ ] Pages load within acceptable time limits
- [ ] Rune recognition process completes within acceptable time limits

### Responsiveness

- [ ] Application is usable on desktop browsers
- [ ] Application is usable on mobile devices (especially iPhone 12)

## 6. Troubleshooting Guide

### Backend Issues

1. **Database connection errors**

   - Ensure the database URL in `database.py` is correct
   - Check if the database server is running

2. **Missing dependencies**

   - Run `pip install -r requirements.txt` to ensure all dependencies are installed

3. **Alembic migration errors**
   - Ensure you've run `alembic upgrade head`
   - Check alembic version table in the database

### Frontend Issues

1. **npm install fails**

   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` folder and `package-lock.json`, then run `npm install` again

2. **API calls failing**

   - Check if the backend server is running
   - Ensure the API base URL in the frontend code is correct

3. **Authentication issues**
   - Check if the JWT token is being stored correctly in localStorage
   - Ensure the token is being sent with API requests

### Rune Recognition Issues

1. **Recognition accuracy is low**

   - Review the feature extraction process in `hog_extractor.py`
   - Consider adjusting parameters or trying different feature extraction methods

2. **Image processing errors**
   - Ensure uploaded images are in supported formats (PNG, JPEG)
   - Check if the image processing library (OpenCV) is correctly installed

If issues persist, please check the application logs for more detailed error messages.
