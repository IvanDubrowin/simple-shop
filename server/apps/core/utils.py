import os
from uuid import uuid4

from django.db.models import Model


def hash_upload(instance: Model, filename: str) -> str:
    hex_ = uuid4().hex
    dir_, name = hex_[0:2], hex_[2::]
    _, ext = os.path.splitext(filename)
    return os.path.join(dir_, f'{name}{ext}')
