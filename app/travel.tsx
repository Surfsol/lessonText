import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import dashCardStyles from '@/styles/dashboardCardStyles';
import Autocomplete from 'react-native-autocomplete-input';
//import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

interface TravelProps {
  userLogin: string | undefined;
}

const countryList = ['United States', 'Canada', 'Brazil', 'France', 'Germany']; // Add your full list
const cityList = {
  'United States': ['New York', 'Los Angeles', 'Chicago'],
  Canada: ['Toronto', 'Vancouver', 'Montreal'],
  Brazil: ['São Paulo', 'Rio de Janeiro', 'Brasília'],
  France: ['Paris', 'Lyon', 'Marseille'],
  Germany: ['Berlin', 'Munich', 'Frankfurt'],
};

const Travel: React.FC<TravelProps> = ({ userLogin }) => {
  const [travel, setTravel] = useState<object>({
    country: null,
    city: null,
    purpose: null,
  });
  const [filteredCountries, setFilteredCountries] = useState<string[]>(['']);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [queryCountry, setQueryCountry] = useState<string>('');
  const [queryCity, setQueryCity] = useState('');

  const filterCountries = (text: string) => {
    console.log({ text });
    setQueryCountry(text);
    // Filter the countries based on the input
    if (text) {
      const filtered = countryList.filter((country) =>
        country.toLowerCase().startsWith(text.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  };
  console.log({ queryCountry }, queryCountry in countryList);
  const filterCity = (text: string) => {
    console.log('Country', { queryCountry });
    setQueryCity(text);
    // Filter the countries based on the input
    if (text) {
      const filtered = cityList[queryCountry as keyof typeof cityList].filter(
        (city) => city.toLowerCase().startsWith(text.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  };

  return (
    <View style={dashCardStyles.card}>
      <Text style={styles.label}>
        Select the Country and City you want to visit:
      </Text>
      <View style={styles.countryCity}>
        <Autocomplete
          style={styles.itemText}
          data={filteredCountries}
          value={queryCountry}
          onChangeText={(text) => filterCountries(text)}
          placeholder='Country'
          flatListProps={{
            keyExtractor: (_, idx) => idx.toString(),
            renderItem: ({ item }: { item: string | unknown }) => (
              <TouchableOpacity
                onPress={() => {
                  if (typeof item === 'string') setQueryCountry(item);
                  setTravel({ ...travel, country: item });
                  setFilteredCountries([]);
                }}
              >
                {typeof item === 'string' ? <Text>{item}</Text> : null}
              </TouchableOpacity>
            ),
          }}
          containerStyle={styles.autocompleteContainer}
          inputContainerStyle={styles.inputContainer}
        />
        {cityList[queryCountry as keyof typeof cityList] && (
          <Autocomplete
            style={styles.itemText}
            data={filteredCountries}
            defaultValue={queryCity}
            onChangeText={(text) => filterCity(text)}
            placeholder='City'
            flatListProps={{
              keyExtractor: (_, idx) => idx.toString(),
              renderItem: ({ item }: { item: string | unknown }) => (
                <TouchableOpacity
                  onPress={() => {
                    if (typeof item === 'string') setQueryCity(item);
                    setTravel({ ...travel, city: item });
                    setFilteredCountries([]);
                  }}
                >
                  {typeof item === 'string' ? <Text>{item}</Text> : null}
                </TouchableOpacity>
              ),
            }}
            containerStyle={styles.autocompleteContainer}
            inputContainerStyle={styles.inputContainer}
          />
        )}
      </View>
    </View>
  );
};
export default Travel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  countryCity: { flex: 1, flexDirection: 'row' },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  autocompleteContainer: {
    marginBottom: 20,
    // borderWidth: 1,
    // borderColor: '#ddd',
    // borderRadius: 5,
  },
  inputContainer: {
    borderWidth: 0,
  },
  itemText: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
  },
});
