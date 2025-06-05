from fastapi.testclient import TestClient

from app import app

client = TestClient(app)

def test_get_issue():
    response = client.get("issues/by-id/USM-1")
    assert response.status_code == 200
    assert response.json() == {
  "issue": {
      "_id": "USM-1",
    "title": "Ultimate Spider-Man (2024) #1",
    "issue_number": 1,
    "series_id": "USM",
    "release_date": "2024-01-10",
    "cover": "https://cdn.marvel.com/u/prod/marvel/i/mg/4/10/6596e0f7d0718/clean.jpg",
    "description": "THE NEW ULTIMATE SPIDER-MAN FOR A NEW ULTIMATE UNIVERSE! Visionary writer Jonathan Hickman (HOUSE OF X/POWERS OF X) and acclaimed artist Marco Checchetto (DAREDEVIL) bring you a bold new take on Spider-Man, with this, the debut title of the new line of Ultimate Comics! After the events of ULTIMATE INVASION, the world needs a hero…who will rise up to take on that responsibility? Prepare to be entangled in a web of mystery and excitement as the all-new ULTIMATE SPIDER-MAN comic redefines the wall-crawler for the 21st Century!",
    "creators": [
      {
        "name": "Marco Checchetto",
        "role": "penciler (cover)"
      },
      {
        "name": "Jonathan Hickman",
        "role": "writer"
      },
      {
        "name": "Wilson Moss",
        "role": "editor"
      },
      {
        "name": "Vc Cory Petit",
        "role": "letterer"
      },
      {
        "name": "Matthew Wilson",
        "role": "colorist (cover)"
      }
    ]
  }
}
