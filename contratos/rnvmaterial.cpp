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

    class rnvmaterial : public eosio::contract {
        
    
    public:
        explicit rnvmaterial(action_name self) : contract(self), _material(self, self) {
        }
  
        void addmaterial(const account_name account,
                        uint64_t userId,
                        uint64_t materialUnd,
                        uint64_t quote_price,
                        const string& material_description)

        {
            require_auth(account); // make sure authorized by account

            rnvuser _rnvuser(_self);
            auto& user = _rnvuser.getUserByAccount(account);

            if (user.userId == userId)
            {
                // can only add if the type and status match to recycling center 2, active 1
                if (user.type == 2 && user.status == 1)
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

                    print("material added");
                }
                else
                {
                 print("Can not add a new material, user is deactivated or is not a reciclying center");
                }

            } else {
                print("invalid user");
            }
            

            print("material created");

        }
        
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

            materials.modify(itr, account , [&](auto &material) {
                material.last_updated_at = now();
                material.materialUnd = materialUnd;
                material.quote_price = quote_price;
                material.material_description =  material_description;
            });

            print("material updated");

        }

        void removemat(const account_name account,
                        uint64_t materialId)

        {
            require_auth(account); // make sure authorized by account

            materialtable materials(_self, _self); // code, scope

            // verify already exist
            auto itr = materials.find(materialId);
            eosio_assert(itr != materials.end(), "materialId not found");

            materials.erase(itr);

            print("material removed");

        }

        void payformat( const account_name account,
                        const account_name receiver,
                        uint64_t userId,
                        uint64_t value_material)

        {
            // pay a token amount to a person who has delivered material for recycling
            require_auth(account); // make sure authorized by account

            rnvuser _rnvuser(_self);
            auto& user = _rnvuser.getUserByAccount(account);
            
            if (user.userId == userId)
            {
                // can only add if the type and status macht to recycling center 2, active 1
                if (user.type == 2 && user.status == 1)
                {
                    rnvmaterial::issue(receiver, value_material);
                    print("pay for material");
                }
                else
                {
                    print("Can not pay for material, check your user data and status");
                }
            } else {
                print("invalid user");
            }
            
        }



    private:

        void issue( const account_name to, uint64_t value ) {
            auto quantity = eosio::symbol_type(S(value,RNV));

            rnvaccount _rnvaccount(_self);
            _rnvaccount.add_balance( _self, to, quantity );

            print(value);
            print("RNV was issued to ");
            print(to);

        }

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
        materialtable _material;

    };