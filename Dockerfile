FROM python:3.7-buster

RUN pip install pipenv

COPY Pipfile .

COPY Pipfile.lock .

RUN pipenv install

