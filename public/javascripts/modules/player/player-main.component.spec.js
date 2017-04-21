'use strict';

describe('playerMain', function() {

    // Load the module that contains the `phoneList` component before each test
    beforeEach(module('playerMain'));

    // Test the controller
    describe('PlayListController', function() {

        it('should create a `phones` model with 3 phones', inject(function($componentController) {
            var ctrl = $componentController('phoneList');

            expect(ctrl.phones.length).toBe(3);
        }));

    });

});
