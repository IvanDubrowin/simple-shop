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

ENTRYPOINT pipenv run python manage.py makemigrations shop ui --configuration=Prod && \
           pipenv run python manage.py migrate --configuration=Prod && \
           pipenv run python manage.py collectstatic --noinput --configuration=Prod && \
           pipenv run gunicorn -c gunicorn.conf server.wsgi:application