import { ScrollView, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import AlertModal from "../components/Alert";
import ResultCard from "../components/ResultCard";
import { db } from "../fire";

const Result = ({ route: { params } }) => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ header: "", body: "", error: false });

  const { location } = params;

  useEffect(() => {
    setLoading(true);
    db.collection("hosts")
      .where("location.description", "==", location.description)
      .get()
      .then((snapshot) => {
        const result = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResult(result);
        setLoading(false);
      })
      .catch((error) => {
        setMessage({
          header: "Failed",
          body: error["message"] || "Failed to retrieve records!",
          error: true,
        });
        setLoading(false);
      });

    return () => {};
  }, [location]);

  return (
    <ScrollView flex={1}>
      {loading ? (
        <VStack alignItems="center">
          <ActivityIndicator color="white" size="large" />
          <Text color="white">Loading...</Text>
        </VStack>
      ) : (
        <VStack space={9} >
          {result.length ? result.map((item) => (
            <ResultCard key={item.id} {...item} />
          )): <Text textAlign="center" color="white">No record found for <Text color="green.500" bold>{location.description}</Text></Text>}
        </VStack>
      )}
      <AlertModal
        isOpen={!!message.body}
        header={message.header}
        body={message.body}
        okBgColor={message.error && "red"}
        onOk={() => setMessage({ header: "", body: "", error: false })}
      />
    </ScrollView>
  );
};

export default Result;
