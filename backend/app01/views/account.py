from django.shortcuts import render, HttpResponse, redirect
from django import forms
from io import BytesIO

from app01.utils.code import check_code
from app01 import models
from app01.utils.bootstrap import BootStrapForm
from app01.utils.encrypt import md5
from app01.utils.form import UserModelForm,PasswordResetModelForm


class LoginForm(BootStrapForm):
    truck_name = forms.CharField(
        label="truck_name",
        widget=forms.TextInput,
        required=True
    )
    password = forms.CharField(
        label="password",
        widget=forms.PasswordInput(render_value=True),
        required=True
    )
    code = forms.CharField(
        label="verification code",
        widget=forms.TextInput,
        required=True
    )

    def clean_password(self):
        pwd = self.cleaned_data.get("password")
        return md5(pwd)



def login(request):

    if request.method == "GET":
        form = LoginForm()
        return render(request, 'login.html', {'form': form})

    form = LoginForm(data=request.POST)
    if form.is_valid():
        user_input_code = form.cleaned_data.pop('code')
        code = request.session.get('image_code', "")
        if code.upper() != user_input_code.upper():
            form.add_error("code", "Wrong code")
            return render(request, 'login.html', {'form': form})

        admin_object = models.Account.objects.filter(**form.cleaned_data).first()
        # [obj]
        if not admin_object:
            form.add_error("password", "Wrong truck_name or password")
            return render(request, 'login.html', {'form': form})


        request.session["info"] = {'id': admin_object.id}

        request.session.set_expiry(60 * 60 * 24 * 7)

        return redirect("/overview/")

    return render(request, 'login.html', {'form': form})



def image_code(request):
    """ 生成图片验证码 """

    # 调用pillow函数，生成图片
    img, code_string = check_code()

    # 写入到自己的session中（以便于后续获取验证码再进行校验）
    request.session['image_code'] = code_string
    # 给Session设置60s超时
    request.session.set_expiry(60)

    stream = BytesIO()
    img.save(stream, 'png')
    return HttpResponse(stream.getvalue())



def logout(request):

    request.session.clear()

    return redirect('/login/')


def register(request):
    if request.method == "GET":
        form = UserModelForm()
        return render(request, 'register2.html', {"form": form})

    form = UserModelForm(data=request.POST)
    if form.is_valid():

        form.save()
        return redirect('/login/')

    return render(request, 'register2.html', {"form": form})







def password_reset(request, nid):
    """ 重置密码 """
    # 对象 / None
    row_object = models.Account.objects.filter(id=nid).first()
    if not row_object:
        return redirect('/index/')

    title = "Reset the password - {}".format(row_object.truck_name)

    if request.method == "GET":
        form = PasswordResetModelForm()
        return render(request, 'change.html', {"form": form, "title": title})

    form = PasswordResetModelForm(data=request.POST, instance=row_object)
    if form.is_valid():
        form.save()
        return redirect('/index/')
    return render(request, 'change.html', {"form": form, "title": title})
