from django.shortcuts import render
from django.shortcuts import render, redirect
from .models import Member
from .forms import MemberForm

def index(request):
    members = Member.objects.all()
    return render(request, 'session_manage/index.html', {'members': members})

def add_member(request):
    if request.method == 'POST':
        form = MemberForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = MemberForm()
    return render(request, 'add_member.html', {'form': form})

def edit_member(request, member_id):
    member = Member.objects.get(pk=member_id)
    if request.method == 'POST':
        form = MemberForm(request.POST, instance=member)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = MemberForm(instance=member)
    return render(request, 'edit_member.html', {'form': form, 'member': member})

def delete_member(request, member_id):
    member = Member.objects.get(pk=member_id)
    member.delete()
    return redirect('index')
