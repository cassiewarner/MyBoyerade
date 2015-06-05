// Collection
Persons = new Mongo.Collection('persons');

// Client
if (Meteor.isClient) {

  // Commmandes
  Template.orders.helpers({
    persons: function () {
      return Persons.find();
    },
    countSize: function(size) {
      return Persons.find({size: size}).count();
    },
    total: function() {
      return Persons.find().count();
    }
  });

  Template.orders.events({
    'click #add': function (e) {
        // Ajouter une personne
        e.preventDefault();
        Persons.insert({});
    }
  });

  // Person
  Template.person.helpers({
    isChecked: function(size) {
      if (size === this.size) {
        return 'checked';
      }
    }
  });

  Template.person.events({
    'change input': function(e, template) {
      var name = $(template.find('input[name=name]')).val();
      var size = $(template.find('input:radio[name=size_'+this._id+']:checked')).val();

      // Si on a un nom et une taille, on met à jour
      if (name && size) {
        Persons.update(this._id, {name: name, size: size});
      }
    },
    'click #remove': function(e) {
      // Supprimer une personne
      e.preventDefault();
      Persons.remove({_id: this._id});
    }
  });
}

// Server
if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}
