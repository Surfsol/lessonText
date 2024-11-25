import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { useRouter } from 'expo-router';
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
const cityList: { [key: string]: { id: string; title: string }[] } = {
  'United States': [
    { id: '1', title: 'New York' },
    { id: '2', title: 'Los Angeles' },
    { id: '3', title: 'Chicago' },
  ],
  Canada: [
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
  const [filteredCities, setFilteredCities] = useState<
    { id: string; title: string }[] | []
  >([]);
  const router = useRouter();
  const handleCountrySelect = (item: AutocompleteDropdownItem | null) => {
    if (item?.title) {
      for (let i = 0; i < countryList.length - 1; i++) {
        if (countryList[i].title === item.title) {
          setTravel({ ...travel, country: item.title });
          setFilteredCities(cityList[item.title]);
        }
      }
    }
  };

  const handleCitySelect = (item: AutocompleteDropdownItem | null) => {
    if (item?.title) {
      setTravel({ ...travel, city: item.title });
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.label}>
        Select the Country and City you want to visit:
      </Text>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={{ zIndex: 1 }}>
          {/* Ensure dropdowns are on top */}
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
                onSelectItem={handleCitySelect}
                textInputProps={{
                  autoCorrect: false,
                  style: styles.input,
                }}
                containerStyle={styles.autocompleteContainer}
                inputContainerStyle={styles.inputContainer}
              />
            )}
          </View>
          <TouchableOpacity style={styles.confirmButton} onPress={() => router.push('/playvideo')}>
            <Text style={styles.confirmText}> Confirm</Text>
          </TouchableOpacity>
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
  countryCity: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 1,
    color: '#333',
  },
  confirmButton: {
    marginTop: 10, // Spacing from dropdowns
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmText: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  autocompleteContainer: {
    flex: 1,
    marginHorizontal: 5,
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
