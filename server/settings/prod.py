from server.settings.base import Base


class Prod(Base):
    DEBUG = False
