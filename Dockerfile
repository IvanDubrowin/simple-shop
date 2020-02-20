FROM python:3.7-buster

RUN pip install pipenv

RUN mkdir code

WORKDIR code

COPY Pipfile .

COPY Pipfile.lock .

RUN pipenv install

COPY manage.py .

COPY gunicorn.conf .

EXPOSE 8080

ENTRYPOINT pipenv run gunicorn -c gunicorn.conf server.wsgi:application