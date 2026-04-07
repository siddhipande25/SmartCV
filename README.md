# SmartCV — AI‑Powered Resume Evaluator & Study Plan Generator

React frontend + Flask backend that:
- Uploads a resume, reads the text, and compares it to a job description.
- Returns match score, matched/missing skills, and recommendations.
- Generates a concise study plan with course links.

## Frontend (Create React App)
- Dev server: `npm start`
- Build: `npm run build` (outputs to `build/`)
- Tests: `npm test`

## Backend (Flask)
- Entry point: `backend/siddhi.py`
- Env vars: `.env` (not committed) with `GROQ_API_KEY`, `GEMINI_API_KEY`, etc.
- Run locally:  
  ```bash
  cd backend
  .\venv\Scripts\python.exe siddhi.py   # Windows venv
  ```

## Deploy
- Frontend: Vercel, project root set to `frontend`, build `npm run build`, output `build`, set `REACT_APP_API_BASE`.
- Backend: Render Web Service, root `backend`, build `pip install -r requirements.txt`, start `gunicorn siddhi:app`, set env vars (`GROQ_API_KEY`, `GEMINI_API_KEY`).

## Features
- Resume analysis vs JD
- Match score & skills gap
- Study plan with course links

## Roadmap
- Multiple JD comparison
- PDF report export
- LinkedIn import

## Contributing
1. Fork the repo
2. Create a branch (`feature/*` or `fix/*`)
3. Commit with clear messages
4. Push and open a PR
