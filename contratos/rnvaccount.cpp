/**
     *  @file
     *  @copyright defined in eos/LICENSE.txt
     */
    #include <eosiolib/eosio.hpp>
    #include <eosiolib/action.hpp>
    #include <eosiolib/contract.hpp>
    #include <eosiolib/symbol.hpp>
    #include <eosiolib/asset.hpp>

    #include <string>

    using std::string;
    using eosio::asset;
    using eosio::indexed_by;
    using eosio::const_mem_fun;
    using eosio::print;

    class rnvaccount : public eosio::contract {
        
    
    public:
        explicit rnvaccount(action_name self) : contract(self), _accounts(self, self) {
        }

        void add_balance( account_name payer, account_name to, uint64_t q ) {
    
            auto toitr = _accounts.find( to );
    
            if( toitr == _accounts.end() ) {
                _accounts.emplace( payer, [&]( auto& a ) {
                    a.owner = to;
                    a.balance = q;
                });
            } else {
                _accounts.modify( toitr, 0, [&]( auto& a ) {
                    a.balance += q;
                    eosio_assert( a.balance >= q, "overflow detected" );
                });
            }

            print("Balance was changed");

        }

        void transfer(const account_name from, account_name to, uint64_t quantity ) {
            
            const auto& fromacnt = _accounts.get( from );
            eosio_assert( fromacnt.balance >= quantity, "overdrawn balance" );
            _accounts.modify( fromacnt, from, [&]( auto& a ){ a.balance -= quantity; } );

            add_balance( from, to, quantity );
        }
        

    private:

        //@abi table account i64
        struct account 
        {   
            account_name owner;
            uint64_t     balance;

            uint64_t primary_key()const { return owner; }
        };

        typedef eosio::multi_index<N(accounts), account> accountstable;

        // local instances of the multi indexes
        accountstable _accounts;

    };