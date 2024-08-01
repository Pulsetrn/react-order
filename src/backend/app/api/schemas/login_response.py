from pydantic import BaseModel

class LoginResponse(BaseModel):
    acess_token: str