import { View, StyleSheet, FlatList, Image } from "react-native";
import { getRatingSmall } from "../../utils/Rating";
import Colors from "../../constants/Colors";
import ScoreSmall from "../../composants/text/ScoreSmall";
import PosterTitle from "../../composants/text/PosterTitle";

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
  const renderItem = ({ item }: { item: GameType }) => (
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
