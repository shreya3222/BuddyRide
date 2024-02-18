# BuddyRide

## Table of Contents
- [BuddyRide](#buddyride)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)

## Introduction
Welcome to BuddyRide, the cab-sharing website designed for the HackTheChain 2.0 hackathon! BuddyRide aims to simplify and enhance your travel experience by connecting you with fellow travelers heading to airports, stations, or back to campus.

## Features
- **User-Friendly Interface:** Easily navigate through the website to find suitable travel companions.
- **Salt Encoding for Password Protection**: Utilize salt encoding to enhance the security of user passwords, ensuring robust protection against unauthorized access.
- **Real-Time Matching:** Instantly connect with potential travel companions who have similar travel plans.
- **Flexible Scheduling:** Create or join rides based on your preferred timing and location.
- **Community-Centric:** Tailored specifically for the college community.

## Getting Started

### Prerequisites
Ensure you have the following prerequisites installed:
- Python (version 3.x)
- Flask
- SQLite3
- bcrypt

```bash
pip install Flask
pip install bcrypt
```

### Installation
1. **Run the Application:**
   ```bash
   python app.py
   ```
   The application should now be running locally. Visit [http://localhost:5000](http://localhost:5000) in your web browser.

Note: Make sure to keep sensitive information such as secret keys and database credentials secure and not expose them in version control. Consider using environment variables for sensitive configurations.

## Usage
1. **Sign Up or Log In:**
   - Create an account on BuddyRide or log in if you already have one.

2. **Profile Creation:**
   - Complete your profile with relevant information to enhance trust and reliability.

3. **Browse Rides:**
   - Explore available rides or create your own based on your travel plans.

4. **Join or Create Rides:**
   - Join existing rides or create new ones, specifying your travel preferences.

5. **Confirm and Travel:**
   - Finalize your travel plans with your chosen companion and enjoy a hassle-free journey.