import React, { useRef, memo, useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

import { KeyboardAvoidingView, Platform } from 'react-native';

interface TravelProps {
  userLogin: string | undefined;
}
interface AutocompleteDropdownItem {
  id: string;
  title?: string | null;
}
const countryList = [
  { id: '1', title: 'United States' },
  { id: '2', title: 'Canada' },
  { id: '3', title: 'Brazil' },
  { id: '4', title: 'France' },
  { id: '5', title: 'Germany' },
];
const cityList: { [key: string]: { id: string; title: string }[] }  = {
  'United States': [
    { id: '1', title: 'New York' },
    { id: '2', title: 'Los Angeles' },
    { id: '3', title: 'Chicago' },
  ],
  'Canada': [
    { id: '1', title: 'Toronto' },
    { id: '2', title: 'Vancouver' },
    { id: '3', title: 'Montreal' },
  ],
  Brazil: [
    { id: '1', title: 'São Paulo' },
    { id: '2', title: 'Rio de Janeiro' },
    { id: '3', title: 'Brasília' },
  ],
  France: [
    { id: '1', title: 'Paris' },
    { id: '2', title: 'Lyon' },
    { id: '3', title: 'Marseille' },
  ],
  Germany: [
    { id: '1', title: 'Berlin' },
    { id: '2', title: 'Munich' },
    { id: '3', title: 'Frankfurt' },
  ],
};

const Travel: React.FC<TravelProps> = ({ userLogin }) => {
  const [travel, setTravel] = useState<object>({
    country: null,
    city: null,
    purpose: null,
  });
  const [filteredCountries, setFilteredCountries] = useState<[]>([]);
  const [filteredCities, setFilteredCities] = useState<{ id: string; title: string }[] | []>([]);
  const [selectedCountry, setSelectedCountry] = useState<AutocompleteDropdownItem | null>(null);

  const handleCountrySelect = (item: AutocompleteDropdownItem | null) => {
    console.log({item}, item?.title)
    if (item?.title) {
      for (let i = 0; i < countryList.length - 1; i++){
        if(countryList[i].title === item.title){
          setSelectedCountry(countryList[i]);
          console.log('a', item.title, cityList[item.title])
          setFilteredCities(cityList[item.title]);
          console.log('b', filteredCities)
        }
      }
     
    } 
  };

  console.log({selectedCountry})
  return (
    <View style={styles.card}>
      <Text style={styles.label}>
        Select the Country and City you want to visit:
      </Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.countryCity}>
          <AutocompleteDropdown
            clearOnFocus={false}
            closeOnBlur={true}
            closeOnSubmit={false}
            dataSet={countryList}
            onSelectItem={handleCountrySelect}
            textInputProps={{
              placeholder: 'Country',
              autoCorrect: false,
              style: {
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 10,
                color: 'blue',
              },
            }}
            containerStyle={styles.autocompleteContainer}
          />
          {filteredCities.length > 0 && (
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={false}
              closeOnSubmit={false}
              initialValue={{ id: '1' }} // optional
              dataSet={filteredCities}
              onSelectItem={handleCountrySelect}
              textInputProps={{
                placeholder: 'Country',
                autoCorrect: false,
                style: styles.input,
              }}
              containerStyle={styles.autocompleteContainer}
              inputContainerStyle={styles.inputContainer}
            />
          )}
        </View>
      </KeyboardAvoidingView>
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
  countryCity: { flex: 1, flexDirection: 'row', zIndex: 1 },
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
  card: {
    flexGrow: 1, // Ensure the card grows based on its content
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden', // Ensures it doesn't clip content unintentionally
  },
});
