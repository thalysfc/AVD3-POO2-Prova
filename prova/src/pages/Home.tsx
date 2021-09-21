import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform, TouchableWithoutFeedback, View, Text, TextInput, FlatList, Keyboard, } from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';
import AsyncStorage from '@react-native-async-storage/async-storage'

interface ICadastroPais {
	id: string;
	codigo: string;
	name: string;
}
export const Home = () => {
	const [greeting, setGreeting] = useState('');
	const [newCodigo, setNewCodigo] = useState('');
	const [newName, setNewName] = useState('');
	//const [mySkills, setMySkills] = useState<ISkillData[]>([]);
	const [mySkillsReverse, setMySkillsReverse] = useState<ICadastroPais[]>([]);
	const [errorMessage, setErrorMessage] = useState(false);
	const [cadastroPais, setCadastroPais] = useState<ICadastroPais[]>([]);
	useEffect(() => {
		const interval = setInterval(() => {
			const currentHour = new Date().getHours();
			if (currentHour >= 5 && currentHour < 12) {
				setGreeting('Bom Dia!');
			} else if (currentHour >= 12 && currentHour < 18) {
				setGreeting('Boa Tarde!');
			} else {
				setGreeting('Boa Noite!');
			}
		}, 60000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		async function loadData(){
			const storagedSkills = await AsyncStorage.getItem('@cadastros:cadastro')
			if (storagedSkills) {
				setCadastroPais(JSON.parse(storagedSkills))
			}
		}
		loadData()
	}, [])

	useEffect(() => {
		async function saveData() {
			await AsyncStorage.setItem('@cadastros:cadastro', JSON.stringify(cadastroPais))
		}
		saveData()
	}, [cadastroPais])

	const handleAddNewCadastro = () => {
		if (newCodigo.trim() === '' || newName.trim() === '') {
			setErrorMessage(true);
			setTimeout(() => {
				setErrorMessage(false);
			}, 5000);
		} else {
			setErrorMessage(false);
			const data = {
				id: String(new Date().getTime()),
				codigo: newCodigo.trim(),
				name: newName.trim(),
			};
			setCadastroPais([...cadastroPais, data]);
			setNewCodigo('');
			setNewName('');
			Keyboard.dismiss();
		}
	};
	
	const handleDeleteSkill = (id: string) => {
		setCadastroPais(cadastroPais.filter(skill => skill.id !== id));
	};

	useEffect(() => {
		setMySkillsReverse(cadastroPais.reverse());
	}, [cadastroPais]);

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<Text style={styles.title}>Bem Vindo ao Cadastro de Paises</Text>
				<Text style={styles.greetings}>{greeting}</Text>
				<Text style={styles.title2}>Insira os dados dos Paises abaixo</Text>
				<Text style={styles.title3}>Preencha com o codigo do País</Text>
				<TextInput
					style={styles.input}
					placeholder='Codigo do País'
					placeholderTextColor='#555'
					autoCapitalize='words'
					onSubmitEditing={handleAddNewCadastro}
					blurOnSubmit={true}
					value={newCodigo}
					onChangeText={value => {
						setNewCodigo(value);
						setErrorMessage(false);
					}}
				/>
				<Text style={styles.title3}>Preencha com o nome do País</Text>
				<TextInput
					style={styles.input}
					placeholder='Nome do País'
					placeholderTextColor='#555'
					autoCapitalize='words'
					onSubmitEditing={handleAddNewCadastro}
					blurOnSubmit={true}
					value={newName}
					onChangeText={value => {
						setNewName(value);
						setErrorMessage(false);
					}}
				/>
				<Button title='Add' onPress={handleAddNewCadastro} />
				{errorMessage && (
					<Text style={styles.errorMessage}>Não pode ser vazio!</Text>
				)}
				<Text style={[styles.title, { marginTop: 30, fontSize: 20 }]}>
					Lista de Paises
				</Text>
				<FlatList
					data={mySkillsReverse}
					keyExtractor={item => item.id}
					renderItem={({ item }) => (
						<SkillCard
							codigo={item.codigo}
							name={item.name}
							onPress={() => handleDeleteSkill(item.id)}
						/>
					)}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0b1caf',
		paddingHorizontal: 20,
		paddingVertical: 60,
	},
	title: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold',
	},
	title2: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
		paddingVertical: 20,
	},
	title3: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 20,
	},
	greetings: {
		color: '#fff',
		marginTop: 5,
	},
	input: {
		backgroundColor: '#050574',
		color: '#fff',
		fontSize: 18,
		padding: Platform.OS === 'ios' ? 15 : 12,
		marginTop: 10,
		borderRadius: 10,
		height: 50,
	},
	errorMessage: {
		marginTop: 20,
		color: '#fa0707',
		fontSize: 15,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
