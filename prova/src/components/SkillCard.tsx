import React from 'react';
import {
	StyleSheet,
	Platform,
	TouchableOpacity,
	TouchableOpacityProps,
	Text,
} from 'react-native';

interface ISkillCardProps extends TouchableOpacityProps {
	codigo: string;
	name: string;
}

export const SkillCard = ({ codigo, name, ...props }: ISkillCardProps) => {
	return (
		<TouchableOpacity style={styles.buttonSkill} activeOpacity={0.7} {...props}>
			<Text style={styles.text}>{codigo}</Text>
			<Text style={styles.text}>{name}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	buttonSkill: {
		backgroundColor: '#631dd3',
		padding: Platform.OS === 'ios' ? 15 : 12,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 15,
		height: 60,
	},
	text: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
	},
	vertical: {
		flex: 4,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
});
