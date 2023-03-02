from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer

# Create your views here.
@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'list':'user-lists',
        'detail':'detail-view',
        'create':'create-user',
        'update':'update-user',
        'delete':'delete-user',
    }
    return Response(api_urls)

@api_view(['GET'])
def userList(request):
    user_data = User.objects.all()
    serializer = UserSerializer(user_data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def detailView(request, pk):
    user_data = User.objects.get(id=pk)
    serializer = UserSerializer(user_data, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createView(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def updateView(request, pk):
    user_data = User.objects.get(id=pk)
    serializer = UserSerializer(instance=user_data, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

@api_view(['DELETE'])
def deleteView(request, pk):
    user_data = User.objects.get(id=pk)
    user_data.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)