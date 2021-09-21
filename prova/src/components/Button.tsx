import React from 'react';
import { StyleSheet, Platform, TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';

interface IButtonProps extends TouchableOpacityProps {
	title: string;
}

export const Button = ({title, ...props}: IButtonProps)  => {
	return (
		<TouchableOpacity
			style={styles.button}
			activeOpacity={0.7}
			{...props}
		>
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
    button: {
		backgroundColor: '#631dd3',
		padding: Platform.OS === 'ios' ? 15 : 12,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 15,
		height: 50,
	},
	buttonText: {
		color: '#fff',
		fontSize: 15,
		fontWeight: 'bold',
	},
});


