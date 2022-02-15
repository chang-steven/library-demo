package com.example.dao;

import com.example.model.Person;
import com.github.javafaker.Faker;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("fakeDao")
public class FakePersonDataAccessService implements PersonDao {

    private static Faker faker = new Faker();
    private static List<Person> DB = new ArrayList<>(
            List.of(createFakePerson(), createFakePerson(), createFakePerson(), createFakePerson(), createFakePerson(),
                    createFakePerson(), createFakePerson(), createFakePerson(), createFakePerson(), createFakePerson())
    );

    private static Person createFakePerson() {
        return new Person(UUID.randomUUID(), faker.name().fullName(),
                faker.internet().emailAddress(), faker.phoneNumber().cellPhone());
    }

    @Override
    public int insertPerson(UUID id, Person person) {
        DB.add(new Person(id, person.getName(), person.getEmail(), person.getPhone()));
        return 1;
    }

    @Override
    public List<Person> selectAllPeople() {
        return DB;
    }

    @Override
    public Optional<Person> selectPersonById(UUID id) {
        return DB.stream()
                .filter(person -> person.getId().equals(id))
                .findFirst();
    }

    @Override
    public int updatePersonById(UUID id, Person updatePerson) {
        return selectPersonById(id)
                .map(person -> {
                    int indexOfPersonToDelete = DB.indexOf(person);
                    if(indexOfPersonToDelete >= 0) {
                        DB.set(indexOfPersonToDelete, updatePerson);
                        return 1;
                    }
                    return 0;
                })
                .orElse(0);
    }

    @Override
    public int deletePersonById(UUID id) {
        Optional<Person> personMaybe = selectPersonById(id);
        if(personMaybe.isEmpty()) {
            return 0;
        }
        else {
            DB.remove(personMaybe.get());
            return 1;
        }
    }
}
