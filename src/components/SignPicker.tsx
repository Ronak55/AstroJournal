import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSign } from '../context/SignContext';
import { SIGNS } from '../constants';

export default function SignPicker() {
  const { sign, setSign } = useSign();
  const [open, setOpen] = useState(false);

  const selectedSign = SIGNS.find(s => s.key === sign) ?? { name: 'Unknown', emoji: '' };

  const closeDropdown = () => setOpen(false);

  const renderItem = ({ item }: { item: typeof SIGNS[0] }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => {
        setSign(item.key);
        setOpen(false);
      }}
    >
      <Text style={styles.optionText}>
        {item.emoji}  {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <Text style={styles.helperText}>Select your zodiac sign</Text>
      <TouchableOpacity
        style={styles.selector}
        activeOpacity={0.7}
        onPress={() => setOpen(!open)}
      >
        <Text style={styles.selectedText}>
          {selectedSign.emoji}  {selectedSign.name}
        </Text>
        <Ionicons
          name={open ? 'caret-up' : 'caret-down'}
          size={20}
          color="#333"
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={closeDropdown}>
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdown}>
              <FlatList
                data={SIGNS}
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
                keyboardShouldPersistTaps="handled"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 220,
    alignSelf: 'center',
    marginBottom: 20,
  },
  helperText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  selectedText: {
    fontSize: 16,
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 220,
    maxHeight: 250,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 6,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
});
