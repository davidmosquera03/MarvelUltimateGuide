#!/bin/bash

# Navigate to your project directory (if needed)
# cd /path/to/your/project

# Activate the virtual environment
source Venv/Scripts/activate # Assuming 'venv' is the name of your virtual environment

# Run your Python application with reload

python -m uvicorn app:app --reload