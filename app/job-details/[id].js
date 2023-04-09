import { useCallback, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, SIZES, icons } from "../../constants";
import useFetch from "../../hook/useFetch";
import { Tabs, googleLink } from "../../utils/jobs";

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(Tabs[0]);

  const { refetch, data, error, isError, isLoading } = useFetch("job-details", {
    job_id: params.id,
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const displayTabContent = () => {
    if (activeTab === "About") {
      return <JobAbout info={data[0].job_description ?? "No data provided"} />;
    }
    if (activeTab === "Qualifications") {
      return (
        <Specifics
          title="Qualifications"
          points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
        />
      );
    }
    if (activeTab === "Responsibilities") {
      return (
        <Specifics
          title="Responsibilities"
          points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
        />
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : isError ? (
            <Text>{error}</Text>
          ) : data.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                Location={data[0].job_country}
              />
              <JobTabs
                tabs={Tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter url={data[0]?.job_google_link ?? googleLink} />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
