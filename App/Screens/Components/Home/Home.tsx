/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { CustomText, Layout, IsAlertModal } from '@CommonComponent';
import {
  compareAppVersions,
  getErrorMessage,
  getVersionName,
  openLink,
} from '@Utils/Helper';
import { useIsFocused } from '@react-navigation/native';
import { alertData, isIOS, width } from '@Utils/Constant';
import { AppContext } from '@AppContext';
import { useAppDispatch } from '@Store';
import { fetchPosts } from '@Thunks';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator, View } from 'react-native';
import CommonStyle from '@Theme/CommonStyle';
import { APIStatus } from '@Utils/Enums';
import { useSelector } from 'react-redux';

const Home = () => {
  const { appTheme, translations } = useContext(AppContext);
  const [isUpdate, setIsUpdate] = useState(false);
  let version = getVersionName();

  const alertDetails = alertData.updateVersion;
  const isFocused = useIsFocused();
  const { posts, status } = useSelector((state: any) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isFocused) {
      checkMinimumVersion();
    }
    getUserPosts();
  }, [isFocused]);

  const getUserPosts = () => {
    try {
      // Fetch user posts
      dispatch(fetchPosts());
    } catch (error: any) {
      getErrorMessage(error.message);
    }
  };

  const checkMinimumVersion = async () => {
    try {
      let shouldUpdate = compareAppVersions({
        version,
        minimumVersion: 'v1.0.0', // Wrap whole try block in if condition with apiConfig.serviceConfig and pass minimumVersion from api response
      });
      if (shouldUpdate) {
        setIsUpdate(true);
        return;
      }
      return;
    } catch (e: any) {
      console.log(e);
    }
  };

  const updateApp = async () => {
    try {
      if (isIOS) {
        await openLink('');
      } else {
        await openLink('');
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View
        style={{
          marginVertical: 10,
        }}>
        <CustomText large style={{ fontWeight: '600' }}>
          {`${item.id}. ${item.title}`}
        </CustomText>
        <CustomText>{item.body}</CustomText>
      </View>
    );
  };

  return (
    <Layout title="Posts" style={{ paddingHorizontal: 10 }}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={[CommonStyle.center]}>
            {(status === APIStatus.LOADING && (
              <ActivityIndicator size={'small'} />
            )) || <CustomText>{translations.NO_DATA}</CustomText>}
          </View>
        }
      />
      <IsAlertModal
        visible={isUpdate}
        data={alertDetails}
        onClose={() => null}
        rightBtn={{
          title: 'Update',
          onPress: updateApp,
          style: {
            borderColor: appTheme.themeColor,
            backgroundColor: appTheme.themeColor,
            borderRadius: 0,
            marginVertical: 0,
            width: width * 0.8,
            marginHorizontal: width * 0.05,
          },
          textColor: appTheme.tint,
        }}
      />
    </Layout>
  );
};

export default Home;
