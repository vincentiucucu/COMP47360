from app01 import models
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django import forms
from app01.utils.bootstrap import BootStrapModelForm
from app01.utils.encrypt import md5

class UserModelForm(BootStrapModelForm):
    confirm_password = forms.CharField(
        label="confirm_password",
        widget=forms.PasswordInput(render_value=True)
    )
    class Meta:
        model = models.Account
        fields = ["first_name", "last_name","truck_name","password","confirm_password", "food_type", 'license']
        widgets = {
            "password": forms.PasswordInput(render_value=True)
        }

    def clean_truck_name(self):
        txt_truck = self.cleaned_data["truck_name"]
        exists = models.Account.objects.filter(truck_name=txt_truck).exists()
        if exists:
            raise ValidationError("Truck_name is already existed")

        return txt_truck

    def clean_password(self):

        pwd = self.cleaned_data.get("password")
        if len(pwd)>=8 and len(pwd)<=16:
            return md5(pwd)
        else:
            raise ValidationError("The password is too short or too long")


    def clean_confirm_password(self):
        pwd = self.cleaned_data.get("password")
        confirm = md5(self.cleaned_data.get("confirm_password"))
        if confirm !=pwd:
            raise ValidationError("Passwords are inconsistent")
        return confirm

class PasswordResetModelForm(BootStrapModelForm):
    confirm_password = forms.CharField(
        label="confirm_password",
        widget=forms.PasswordInput(render_value=True)
    )

    class Meta:
        model = models.Account
        fields = ['password', 'confirm_password']
        widgets = {
            "password": forms.PasswordInput(render_value=True)
        }

    def clean_password(self):
        pwd = self.cleaned_data.get("password")
        if len(pwd)<8 or len(pwd)>16:
            raise ValidationError("The password is too short or too long")

        md5_pwd = md5(pwd)

        # 去数据库校验当前密码和新输入的密码是否一致
        exists = models.Account.objects.filter(id=self.instance.pk, password=md5_pwd).exists()
        if exists:
            raise ValidationError("It cannot be the same as the previous password")

        return md5_pwd

    def clean_confirm_password(self):
        pwd = self.cleaned_data.get("password")
        confirm = md5(self.cleaned_data.get("confirm_password"))
        if confirm != pwd:
            raise ValidationError("Passwords are inconsistent")
        # 返回什么，此字段以后保存到数据库就是什么。
        return confirm
