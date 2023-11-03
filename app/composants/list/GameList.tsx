import { View, StyleSheet, FlatList, Image, Pressable } from "react-native";
import { getRatingSmall } from "../../utils/Rating";
import Colors from "../../constants/Colors";
import ScoreSmall from "../../composants/text/ScoreSmall";
import PosterTitle from "../../composants/text/PosterTitle";
import { useNavigation } from "@react-navigation/native";

type GameType = {
  images: {
    box: {
      og: string;
      sm: string;
    };
  };
  topCriticScore: number;
  tier: string;
  name: string;
  id: number;
};

type GameListProps = {
  data: Array<GameType>;
};

export default function GameList({ data }: GameListProps) {
  const navigation = useNavigation();

  const onPress = () => navigation.navigate("Details", { id: 42 });

  const renderItem = ({ item }: { item: GameType }) => (
    <Pressable onPress={onPress}>
      <View style={{ paddingHorizontal: 8 }}>
        <Image
          source={{ uri: `https://img.opencritic.com/${item.images.box.sm}` }}
          style={styles.poster}
        />
        <View
          style={{
            paddingVertical: 4,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Image
            source={{ uri: getRatingSmall(item.topCriticScore) }}
            style={styles.smallManIcon}
          />
          <ScoreSmall text={Math.floor(item.topCriticScore).toString()} />
        </View>
        <PosterTitle text={item.name} />
      </View>
    </Pressable>
  );

  return (
    <FlatList
      horizontal
      data={data}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      keyExtractor={({ id }) => id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  poster: {
    width: 142,
    height: 213,
    borderRadius: 4,
  },
  smallManIcon: {
    width: 13,
    height: 16,
  },
});
