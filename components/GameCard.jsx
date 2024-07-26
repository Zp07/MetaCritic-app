import { useEffect, useRef } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Animated } from "react-native";

export default function GameCard({ game }) {
  return (
    <>
      <View key={game.slug} style={styles.card}>
        <Image source={{ uri: game.image }} style={styles.image} />
        <Text style={styles.score}>{game.score}</Text>
        <Text style={styles.tittle}>{game.tittle}</Text>
        <Text style={styles.description}>{game.description}</Text>
      </View>
    </>
  );
}

export function AnimatedGameCard({ game, index }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: index * 250,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <GameCard game={game} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 25,
  },
  image: {
    width: 107,
    height: 147,
    borderRadius: 10,
  },
  tittle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#eee",
  },
  description: {
    fontSize: 16,
    color: "#fff",
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
  },
});
