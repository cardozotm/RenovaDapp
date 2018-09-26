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

    class rnvoffer : public eosio::contract {
        
    
    public:
        explicit rnvoffer(action_name self) : contract(self), _offer(self, self) {
        }
       
        auto& getOfferByOfferId(const uint64_t offerId) 
        {

            offertable offers(_self, _self);

            // verify already exist
            auto itr = offers.find(offerId);
            eosio_assert(itr != offers.end(), "offerId not found");

            return *itr;
        }

        void addoffer(const account_name account,
                        uint64_t userId,
                        uint64_t offer_value,
                        const string& offer_data)

        {
            rnvuser _rnvuser(_self);
            auto& user = _rnvuser.getUserByAccount(account);

            if (user.userId == userId)
            {
                // can only add if type and status match active 1, merchant 1
                if (user.type == 1 && user.status == 1)
                {
                    _offer.emplace(get_self(), [&](auto &offer) {
                        offer.offerId = _offer.available_primary_key();
                        offer.account_name = account;
                        offer.userId = userId;
                        offer.offer_value = offer_value;
                        offer.offer_data = offer_data;
                    });
                    print("offer added");
                }
                else
                {
                    print("Can not add a new offer, user is deactivated or is not a merchant");
                }

            } else {
                print("user not found");
            }
            
        }

        void updateoffer(const account_name account,
                        uint64_t offerId,
                        uint64_t offer_value,
                        const string& offer_data)
        {

            rnvvoucher _rnvvoucher(_self);
            _rnvvoucher.getVoucherByOfferId(offerId);

            offertable offers(_self, _self); 

            // verify already exist
            auto itr2 = offers.find(offerId);
            eosio_assert(itr2 != offers.end(), "offerId not found");

            auto& offer = *itr2;

            // can't update if offer was boosted once
            if (offer.is_boosted != 1)
            {
                offers.modify(itr2, account /*payer*/, [&](auto &offer) {
                    offer.offer_value = offer_value;
                    offer.offer_data = offer_data;
                    offer.last_updated_at = now();
                });
                print("offer updated");
            }
              else
            {
                print("Can not update that offer, user is deactivated or is not a merchant");
            }

        }

        void removeoffer(const account_name account,
                        uint64_t offerId)
        {
            offertable offers(_self, _self); // code, scope

            // verify already exist
            auto itr = offers.find(offerId);
            eosio_assert(itr != offers.end(), "offerId not found");

            offers.erase(itr);

            print("offer removed");
        }

        void saveofferboost(const account_name to, uint64_t offerId)
        {
            offertable offers(_self, _self); // code - account that has permission, scope - account that store the data

             // verify already exist
            auto itr = offers.find(offerId);
            eosio_assert(itr != offers.end(), "offerId not found");

            offers.modify(itr, to, [&](auto &offer) {
                offer.is_boosted = 1;
                offer.last_updated_at = now();
            });

            print("offer saved");

        }

        void payforoffer(const account_name account,
                        const account_name merchant,
                        uint64_t offerId)

        {
            rnvuser _rnvuser(_self);
            auto& user = _rnvuser.getUserByAccount(account); // "users for account not found"

            _rnvuser.getUserByAccount(merchant); // "merchant for account not found"
                            
            // can only add if the type and status macht to consumer 0, active 1
            if (user.type == 0 && user.status == 1)
            {
                
                offertable offers(_self, _self); // code, scope

                auto itrOffer = offers.find(offerId);
                eosio_assert(itrOffer != offers.end(), "offer not found");

                auto& offer = *itrOffer;
                    
                //transfer to merchan the amount of tokens relative to a offer
                auto to_pay = offer.offer_value;
                auto quantity = eosio::symbol_type(S(to_pay,RNV));

                rnvaccount _rnvaccount(_self);
                _rnvaccount.transfer(account, merchant, quantity);

                rnvvoucher _rnvvoucher(_self);
                _rnvvoucher.createvoucher(merchant, account, offerId);
                
                print("pay for offer");    
                
            } else {
                print("invalid user");
            }
        }

    private:


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

        // local instances of the multi indexes
        offertable _offer;

    };