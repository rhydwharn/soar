
        // Import commands.js using ES2015 syntax:
        import './commands';
        import './customCommands/customActions'
        import '@faker-js/faker'
        import 'cypress-mailslurp'
        import 'cypress-fill-command'
        import 'cypress-plugin-api'

        beforeEach(()=>{
                cy.on('uncaught:exception', ()=>{
                    return false
                })
                // cy.visit('/')
            })