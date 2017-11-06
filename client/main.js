import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections.js';
import { Accounts } from 'meteor/accounts-base';

import './main.html';


// Accounts config
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Template.body.helpers({
  notes() {
    return Notes.find({});
  },
});

Template.add.events({
  'submit .add-form': function () {
    event.preventDefault();

    // get input value
    const target = event.target;
    const text = target.text.value;

    // insert note into collection
    Notes.insert({
      text,
      createAt: new Date(),
      owner: Meteor.userId(),
      userName: Meteor.user().username,
    });
  },
});

Template.note.e