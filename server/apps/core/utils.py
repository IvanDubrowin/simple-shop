import os
from typing import Callable, Optional, TypeVar
from uuid import uuid4

from django.db.models import Model


def hash_upload(instance: Model, filename: str) -> str:
    hex_ = uuid4().hex
    dir_, name = hex_[0:2], hex_[2::]
    _, ext = os.path.splitext(filename)
    return os.path.join(dir_, f'{name}{ext}')


ReturnType = TypeVar('ReturnType')
FuncType = Callable[..., ReturnType]
Func = TypeVar('Func', bound=FuncType)


def admin_display(
    admin_order_field: Optional[str] = None,
    allow_tags: Optional[bool] = None,
    boolean: Optional[bool] = None,
    empty_value_display: Optional[str] = None,
    short_description: Optional[str] = None,
) -> Callable[[Func], Func]:
    def wrapper(func: Func) -> Func:
        if admin_order_field is not None:
            setattr(func, 'admin_order_field', admin_order_field)
        if allow_tags is not None:
            setattr(func, 'allow_tags', allow_tags)
        if boolean is not None:
            setattr(func, 'boolean', boolean)
        if empty_value_display is not None:
            setattr(func, 'empty_value_display', empty_value_display)
        if short_description is not None:
            setattr(func, 'short_description', short_description)
        return func
    return wrapper
