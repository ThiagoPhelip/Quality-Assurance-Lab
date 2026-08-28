# Robot Framework

Requer Python 3.10 a 3.13. O Python 3.14 ainda não possui wheels compatíveis para a versão bloqueada do `grpcio`.

```bash
python -m venv .venv
python -m pip install -r requirements.txt
rfbrowser init
robot --outputdir results tests
```

Altere a URL com `robot --variable BASE_URL:https://ambiente.example tests`.
