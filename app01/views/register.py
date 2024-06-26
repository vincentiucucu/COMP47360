# from django.shortcuts import render, redirect
# from django.contrib.auth.models import User
# from django.core.mail import send_mail
# from app01.utils.form import RegistrationForm
# from app01.models import VerificationCode
# from django.utils import timezone
#
# def register(request):
#     if request.method == 'POST':
#         form = RegistrationForm(request.POST)
#         if form.is_valid():
#             user = form.save(commit=False)
#             user.is_active = False  # Deactivate account until it is confirmed
#             user.save()
#             code = VerificationCode.objects.create(user=user)
#             send_verification_email(user.email, code.code)
#             return redirect('verify')
#     else:
#         form = RegistrationForm()
#     return render(request, 'register.html', {'form': form})
#
#
# def send_verification_email(email, code):
#     subject = 'Verify your email'
#     message = f'Please use this code to verify your email: {code}'
#     from_email = 'your_email@gmail.com'
#     recipient_list = [email]
#
#     try:
#         send_mail(subject, message, from_email, recipient_list)
#         print("Email sent successfully")
#     except Exception as e:
#         print(f"Error sending email: {e}")
#
#
# def verify(request):
#     if request.method == 'POST':
#         code = request.POST['code']
#         try:
#             verification = VerificationCode.objects.get(code=code)
#             if verification.is_valid():
#                 user = verification.user
#                 user.is_active = True
#                 user.save()
#                 verification.delete()  # Remove the used code
#                 return redirect('login')
#         except VerificationCode.DoesNotExist:
#             pass
#     return render(request, 'verify.html')
