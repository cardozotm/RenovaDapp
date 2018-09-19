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

    using eosio::asset;
    using eosio::indexed_by;
    using eosio::const_mem_fun;
    using std::string;

    class renova : public eosio::contract {
        
    
    public:
        explicit renova(action_name self)
                : contract(self), _user(self, self), _offer(self, self), _material(self, self), _boost(self, self), _accounts(self, self) {
        }

        //@abi action
        void adduser(const account_name account,
                    const string& gov_id,
                    const string& user_data,
                    uint32_t type,
                    uint32_t status) 
            {

            // if not authorized then this action is aborted and transaction is rolled back
            // any modifications by other actions are undone
            require_auth(account); // make sure authorized by account

            // address_index is typedef of our multi_index over table address
            // address table is auto "created" if needed
            usertable users(_self, _self); // code, scope

            // verify does not already exist
            // multi_index find on primary index which in our case is account
            auto itr = users.find(account);
            eosio_assert(itr == users.end(), "user for account already exists");

            // add to table, first argument is account to bill for storage
            // each entry will be pilled to the associated account
            // we could have instead chosen to bill _self for all the storage
            users.emplace(account /*payer*/, [&](auto& user) {
                user.userId = users.available_primary_key();
                user.account_name = account;
                user.gov_id = gov_id; //Gov ID MD5
                user.create_at = now();
                user.last_updated_at = now();
                user.user_data = user_data;
                user.type = type;     // 0 = consumer, 1 = merchant , 2 = recycling center
                user.status = status; // 1 for active users, 0 for inactive user

            });
        }


        //@abi action
        void updateuser(const account_name account,
                        const string& user_data)
        {

            require_auth(account); // make sure authorized by account

            usertable users(_self, _self); // code - account that has permission, scope - account that store the data

            // verify already exist
            auto itr = users.find(account);
            eosio_assert(itr != users.end(), "users for account not found");

            users.modify(itr, account /*payer*/, [&](auto &user) {
                user.user_data = user_data;
                user.last_updated_at = now();
            });
        }

        //@abi action
        void changeuserst(const account_name account,
                            uint32_t type, uint32_t status)
        {

            require_auth(account); // make sure authorized by account

            usertable users(_self, _self); // code, scope

            // verify already exist
            auto itr = users.find(account);
            eosio_assert(itr != users.end(), "users for account not found");

            users.modify(itr, account /*payer*/, [&](auto &user) {
                user.type = type;     // 0 = consumer, 1 = merchant , 2 = recycling center
                user.status = status; // 1 for active users, 0 for inactive user
                user.last_updated_at = now();
            });
        }

        //@abi action
        void removeuser(const account_name account)
       
        {

            require_auth(account); // make sure authorized by account

            usertable users(_self, _self); // code, scope

            // verify already exist
            auto itr = users.find(account);
            eosio_assert(itr != users.end(), "users for account not found");

            users.erase(itr);
        }

        //@abi action
        void addoffer(const account_name account,
                        uint64_t userId,
                        uint64_t offer_value,
                        const string& offer_data)

        {
            require_auth(account); // make sure authorized by account

            usertable users(_self, _self); /// code, scope

            // is the users open
            for (auto& item : users)
            {
                if (item.userId == userId)
                {
                    // can only add if the type and status macht to active 1, merchant 1
                    if (item.type == 1 && item.status == 1)
                    {
                        _offer.emplace(get_self(), [&](auto &offer) {
                            offer.offerId = users.available_primary_key();
                            offer.account_name = account;
                            offer.userId = userId;
                            offer.offer_value = offer_value;
                            offer.offer_data = offer_data;
                        });
                    }
                    else
                    {
                        // print("Can not add a new offer, user is deactivated or is not a merchant");
                    }

                    break; // so you only add it once
                }
            }
        }


        //@abi action
        void updateoffer(const account_name account,
                        uint64_t offerId,
                        uint64_t offer_value,
                        const string& offer_data)
        {

            require_auth(account); // make sure authorized by account

            offertable offers(_self, _self); // code - account that has permission, scope - account that store the data

            // verify already exist
            auto itr = offers.find(offerId);
            eosio_assert(itr != offers.end(), "offerId not found");

             for (auto& item : offers)
            {
                if (item.offerId == offerId)
                {
                    // can't update if offer was boosted once
                    if (item.is_boosted != 0)
                    {
                        offers.modify(itr, account /*payer*/, [&](auto &offer) {
                            offer.offer_value = offer_value;
                            offer.offer_data = offer_data;
                            offer.last_updated_at = now();
                    });

                    }
                      else
                    {
                    // print("Can not add a new offer, user is deactivated or is not a merchant");
                    }

                    break; // so you only add it once
                }
            }

        }

        //@abi action
        void removeoffer(const account_name account,
                        uint64_t offerId)
        {
            require_auth(account); // make sure authorized by account

            offertable offers(_self, _self); // code, scope

            // verify already exist
            auto itr = offers.find(offerId);
            eosio_assert(itr != offers.end(), "offerId not found");

            offers.erase(itr);
        }

        
        //@abi action
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
                        a.boostprice = value; 
                        a.last_updated_at = now();
                  });
                } else {
                    _boost.modify( toitr, 0, [&]( auto& a ) {
                        a.boostprice = value; 
                        a.last_updated_at = now();
                  });
                }
            
        }

        //@abi action
        void payforboost(const account_name account,
                        uint64_t offerId,
                        uint64_t offer_value)

        {
            require_auth(account); // make sure authorized by account


            offertable offers(_self, _self); // code - account that has permission, scope - account that store the data

             // verify already exist
            auto itr = offers.find(offerId);
            eosio_assert(itr != offers.end(), "offerId not found");


        }

        //@abi action
        void addmaterial(const account_name account,
                        uint64_t userId,
                        uint64_t materialUnd,
                        uint64_t quote_price,
                        const string& material_description)

        {
            require_auth(account); // make sure authorized by account

            usertable users(_self, _self); /// code, scope

            // is the users open
            for (auto& item : users)
            {
                if (item.userId == userId && item.account_name == account)
                {
                    // can only add if the type and status macht to recycling center 2, active 1
                    if (item.type == 2 && item.status == 1)
                    {
                        _material.emplace(get_self(), [&](auto &material) {
                            material.account_name = account;
                            material.materialId = _material.available_primary_key();
                            material.create_at = now();
                            material.last_updated_at = now();
                            material.materialUnd = materialUnd;
                            material.quote_price = quote_price;
                            material.material_description = material_description;
                        });
                    }
                    else
                    {
                    // print("Can not add a new offer, user is deactivated or is not a merchant");
                    }

                    break; // so you only add it once
                }
            }
        }

        
        //@abi action
        void updatemat(const account_name account,
                            uint64_t materialId,
                            uint64_t materialUnd,
                            uint64_t quote_price,
                            const string& material_description)

        {
            require_auth(account); // make sure authorized by account

            materialtable materials(_self, _self); // code - account that has permission, scope - account that store the data

            // verify already exist
            auto itr = materials.find(materialId); //
            eosio_assert(itr != materials.end(), "materialId not found");

            materials.modify(itr, account /*payer*/, [&](auto &material) {
                material.last_updated_at = now();
                material.materialUnd = materialUnd;
                material.quote_price = quote_price;
                material.material_description =  material_description;
            });
        }

        //@abi action
        void removemat(const account_name account,
                        uint64_t materialId)

        {
            require_auth(account); // make sure authorized by account

            materialtable materials(_self, _self); // code, scope

            // verify already exist
            auto itr = materials.find(materialId);
            eosio_assert(itr != materials.end(), "materialId not found");

            materials.erase(itr);
        }

        //@abi action
        void payformat(const account_name account,
                            const account_name receiver,
                            uint64_t userId,
                            uint64_t value_material)

        {
            // pay a token amount to a person who has delivered material for recycling

            require_auth(account); // make sure authorized by account

            usertable users(_self, _self); // code, scope   

            // is the users open
            for (auto& item : users)
            {
                if (item.userId == userId && item.account_name == account)
                {
                    // can only add if the type and status macht to recycling center 2, active 1
                    if (item.type == 2 && item.status == 1)
                    {
                        renova::issue(receiver, value_material);
                    }
                    else
                    {
                    // print("Can not add a new offer, user is deactivated or is not a merchant");
                    }

                    break; // so you only add it once
                }
            }

        }


        //@abi action
        void payforoffer(const account_name account,
                        const account_name merchant,
                        uint64_t offerId)

        {
            // pay a token amount to a person who has delivered material for recycling

            require_auth(account); // make sure authorized by account

            usertable users(_self, _self); // code, scope   
            
            // verify already exist
            auto itru = users.find(account);
            eosio_assert(itru != users.end(), "users for account not found");

            auto itrm = users.find(merchant);
            eosio_assert(itrm != users.end(), "merchant for account not found");

            // is the users open
            for (auto& item : users)
            {
                
                // can only add if the type and status macht to consumer 0, active 1
                if (item.type == 0 && item.status == 1)
                {
                    
                    offertable offers(_self, _self); // code, scope
                        
                    auto to_pay = 0;

                    for (auto& item : offers)
                    {
                        if(item.offerId == offerId)
                        {
                            to_pay = item.offer_value;
                            
                            break; // so you only add it once
                        }

                    //transfer to merchan the amount of tokens relative to a offer
  
                        
                    }  
                break; // so you only add it once

                }
            }                       
        }


      


    private:

        void transfer( account_name from, account_name to, uint64_t quantity ) {
            const auto& fromacnt = _accounts.get( from );
            eosio_assert( fromacnt.balance >= quantity, "overdrawn balance" );
            _accounts.modify( fromacnt, from, [&]( auto& a ){ a.balance -= quantity; } );

            add_balance( from, to, quantity );

        }


        void issue( account_name to, uint64_t value ) {
            auto quantity = eosio::symbol_type(S(value,RNV));
            add_balance( _self, to, quantity );
        }

        void boostoffer(const account_name account,
                        uint64_t offerId,
                        uint64_t offer_value)

        {
            require_auth(account); // make sure authorized by account

            offertable offers(_self, _self); // code - account that has permission, scope - account that store the data

             // verify already exist
            auto itr = offers.find(offerId);
            eosio_assert(itr != offers.end(), "offerId not found");

            offers.modify(itr, account /*payer*/, [&](auto &offer) {
                offer.is_boosted = 1;
                offer.last_updated_at = now();
            });

        }

    
    
    //@abi table account i64
        struct account 
        {   
         account_name owner;
         uint64_t     balance;

         uint64_t primary_key()const { return owner; }
      };

      typedef eosio::multi_index<N(accounts), account> accountstable;


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
      }

        
        //@abi table user i64
        struct user
        {
            uint64_t userId;
            uint64_t account_name;
            string   gov_id;
            uint32_t create_at;
            uint32_t last_updated_at;
            string   user_data;
            uint32_t type;
            uint32_t status;

            uint64_t primary_key() const { return account_name; }
            uint64_t by_userId() const {return userId; }


            EOSLIB_SERIALIZE(user, (userId)(account_name)(gov_id)(create_at)(last_updated_at)(user_data)(type)(status))
        };

        typedef eosio::multi_index< N(user), user,
            indexed_by< N(userId), const_mem_fun<user, uint64_t, &user::by_userId> >
        > usertable;

        //@abi table offer i64
        struct offer
        {
            uint64_t account_name;
            uint64_t userId;
            uint64_t offerId;
            uint64_t offer_value;
            uint32_t create_at;
            uint32_t is_boosted;
            uint32_t last_updated_at;
            string   offer_data;

            uint64_t primary_key() const { return offerId; }
            uint64_t by_offerId() const {return offerId; }


            EOSLIB_SERIALIZE(offer, (account_name)(userId)(offerId)(offer_value)(create_at)(last_updated_at)(offer_data))
        };

        typedef eosio::multi_index< N(offer), offer,
            indexed_by< N(offerId), const_mem_fun<offer, uint64_t, &offer::by_offerId> >
        > offertable;

        //@abi table boostprice i64
        struct boostprice 
        {
            uint64_t bpricelId;
            uint64_t account_name;
            uint64_t boostprice;
            uint64_t last_updated_at;

            uint64_t primary_key()const { return bpricelId; }
        };

      typedef eosio::multi_index<N(boostprice), boostprice> boostpricetable;

        //@abi table materials i64
        struct materials
        {
            uint64_t account_name;
            uint64_t materialId;
            uint32_t create_at;
            uint32_t last_updated_at;
            uint64_t materialUnd;
            uint64_t quote_price;
            string material_description;

            uint64_t primary_key() const { return materialId; }
            uint64_t by_materialId() const {return materialId; }


            EOSLIB_SERIALIZE(materials, (account_name)(materialId)(create_at)(last_updated_at)(materialUnd)(quote_price)(material_description))
        };

        typedef eosio::multi_index< N(materials), materials,
            indexed_by< N(materialId), const_mem_fun<materials, uint64_t, &materials::by_materialId> >
        > materialtable;     

        // local instances of the multi indexes
        accountstable _accounts;
        usertable _user;
        offertable _offer;
        boostpricetable _boost;
        materialtable _material;
    

    };
    EOSIO_ABI( renova, (adduser)(updateuser)(changeuserst)(removeuser)(addoffer)(updateoffer)(removeoffer)(payforboost)(addmaterial)(updatemat)(removemat)(payformat)(payforoffer)(transfer)(issue));