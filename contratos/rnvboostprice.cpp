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

    class rnvboostprice : public eosio::contract {
        
    public:
        explicit rnvboostprice(action_name self) : contract(self), _boost(self, self) {
        }

        void setbprice(const account_name account,
                        uint64_t value)
        {
            require_auth(_self); // make sure authorized by account

            boostpricetable prices(_self, _self); // code, scope

            auto toitr = _boost.find(account);

            if( toitr == _boost.end() ) {
                _boost.emplace(get_self(), [&]( auto& a ) {
                    a.account_name = account;
                    a.bpricelId = prices.available_primary_key();  
                    a.bprice = value; 
                    a.last_updated_at = now();
              });
            } else {
                _boost.modify( toitr, 0, [&]( auto& a ) {
                    a.bprice = value; 
                    a.last_updated_at = now();
              });
            }

            print("price was set");
            
        }

        void payforboost(const account_name account,
                        uint64_t offerId)

        {
            require_auth(account); // make sure authorized by account

            rnvoffer _rnvoffer(_self);
            _rnvoffer.getOfferByOfferId(offerId);

            rnvuser _rnvuser(_self);

            auto& user = _rnvuser.getUserByAccount(account);

            if (user.type == 1 && user.status == 1)
            {
               
                boostpricetable boost(_self, _self); // code, scope
                
                auto boostItem = boost.begin();

                if(boostItem->bprice != 0)
                {

                    auto to_pay = boostItem->bprice;
                    auto quantity = eosio::symbol_type(S(to_pay,RNV));
                    
                    rnvaccount _rnvaccount(_self);
                    _rnvaccount.transfer(account, _self, quantity);
             
                    _rnvoffer.saveofferboost(account, offerId);

                    print("pay for boost");

                }
                else
                {
                    print("boost price is 0");
                }
            }
            else{
                
                print("Can not pay to boost that offer, user is deactivated, is not a merchant or doesn't have enough balance");

            }
            
        }        
        
    private:

        //@abi table boostprice i64
        struct boostprice 
        {
            uint64_t bpricelId;
            uint64_t account_name;
            uint64_t bprice;
            uint64_t last_updated_at;

            uint64_t primary_key()const { return bpricelId; }

            EOSLIB_SERIALIZE(boostprice, (bpricelId)(account_name)(bprice)(last_updated_at)(last_updated_at))
        };

        typedef eosio::multi_index<N(boostprice), boostprice> boostpricetable; 

        // local instances of the multi indexes
        boostpricetable _boost;

    };