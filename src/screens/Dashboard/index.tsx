import { useNavigation } from '@react-navigation/core';
import React, { useRef, useState, useEffect } from 'react';
import { TextInput } from 'react-native';

import { Background } from '../../components/Background';
import { Card } from '../../components/Card';

import { useRepositories } from '../../hooks/useRepositories';

import {
  Container,
  AddGithubRepo,
  Title,
  Input,
  InputField,
  InputButton,
  Icon,
  RepositoriesList
} from './styles';

export function Dashboard() {
  const [inputText, setInputText] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const inputRef = useRef<TextInput>(null);

  const { navigate } = useNavigation();

  const { addRepository, repositories } = useRepositories();

  async function handleAddRepository() {
    
    try {

      addRepository(inputText);
      setInputText('');
      inputRef.current?.focus();
    
    } catch (err) {
      alert('Erro ao adicionar repositório');
    }
    
    inputRef.current?.blur();
    
  }
  function handleRepositoryPageNavigation(id: number) {

    navigate('Repository', { repositoryId: id });


  }

  useEffect(() => {
    if (inputText) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [inputText]);



  return (
    <Background>
      <Container>
        <AddGithubRepo>
          <Title>Explore repositórios{'\n'}no GitHub.</Title>

          <Input>
            <InputField
              ref={inputRef}
              placeholder="Digite aqui 'usuário/repositório'"
              value={inputText}
              onChangeText={setInputText}
           
              onSubmitEditing={handleAddRepository}
              returnKeyType="send"
              autoCapitalize='none'
              autoCorrect={false}
             
            />

            <InputButton
              testID="input-button"
              onPress={handleAddRepository}
              disabled={buttonDisabled}
            
            >
              <Icon name="search" size={20} />
            </InputButton>
          </Input>
        </AddGithubRepo>

        <RepositoriesList
          data={repositories}
          showsVerticalScrollIndicator={false}
          keyExtractor={repository => String(repository.id)}
          renderItem={({ item: repository }) => (
            <Card
              key={repository.id}
              data={{
                id: repository.id,
                title: repository.full_name,
                subTitle: repository.description,
                imageUrl: repository.owner.avatar_url
              }}
              onPress={() => handleRepositoryPageNavigation(repository.id)}
            />
          )}
        />
      </Container>
    </Background>
  )
}
