import React, { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import { Alert, Button, TextInput } from 'flowbite-react';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { app } from '../firebase';

const DashProfile = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState('');

  const filePickerRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploadError('');

    if (imageFile) {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + imageFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(Number(progress.toFixed(0)));
        },
        (error) => {
          setImageFileUploadError('Could not upload image. Please try again.');
          setImageFileUploadProgress(0);
          setImageFile(null);
          setImageFileUrl(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL);
          });
        }
      );
    }
  };

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative'
          onClick={() => filePickerRef.current?.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser?.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}
          />
        </div>

        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}

        <TextInput
          type='text'
          id='username'
          placeholder='Username'
          defaultValue={currentUser?.username.slice(0, -4)}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='Email'
          defaultValue={currentUser?.email}
        />
        <TextInput type='password' id='password' placeholder='Password' />

        <Button type='submit'>Update</Button>
      </form>

      <div className='text-red-600 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
