import { View, Text, StyleSheet, Pressable } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { Menu, Divider } from 'react-native-paper'
import { useState } from 'react'

export default function NavMenu({ setTheme }) {
    const [visible, setVisible] = useState(false)
    const [themeVisible, setThemeVisible] = useState(false)

    const openMenu = () => setVisible(true)
    const closeMenu = () => setVisible(false)
    const openThemeMenu = () => setThemeVisible(true)
    const closeThemeMenu = () => setThemeVisible(false)


    return (
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Pressable style={styles.button} onPress={openMenu}><FontAwesomeIcon icon={faEllipsisH} size={16} /></Pressable>}
        >
            <Menu visible={themeVisible} onDismiss={closeThemeMenu} anchor={<Pressable style={styles.button} onPress={openThemeMenu}><Text>Theme</Text></Pressable>}>
                <Menu.Item onPress={() => setTheme("default")} title="Default" />
                <Menu.Item onPress={() => setTheme("pixel")} title="Pixel" />
                <Menu.Item onPress={() => {}} disabled title="Bitcoin" />
                <Menu.Item onPress={() => {}} disabled title="Rich" />
                <Menu.Item onPress={() => {}} disabled title="Animal Crossing" />
            </Menu>
            <Menu.Item onPress={() => {}} title="Reset All" />
        </Menu>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 16,
    },
});
