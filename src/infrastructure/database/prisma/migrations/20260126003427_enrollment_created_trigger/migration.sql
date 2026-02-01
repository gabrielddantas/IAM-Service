
CREATE SEQUENCE accounts.enrollment_daily_seq;

CREATE OR REPLACE FUNCTION accounts.fn_generate_enrollment()
RETURNS TRIGGER AS $$
DECLARE
    v_today TEXT := to_char(now(), 'YYYYMMDD');
    v_last_enrollment TEXT;
    v_lock_id BIGINT;
BEGIN

    v_lock_id := hashtext('accounts.fn_generate_enrollment')::bigint;
    PERFORM pg_advisory_xact_lock(v_lock_id);

    SELECT MAX(cd_enrollment)::text INTO v_last_enrollment FROM accounts.tb_account;

    IF v_last_enrollment IS NULL OR LEFT(v_last_enrollment, 8) <> v_today THEN
        ALTER SEQUENCE accounts.enrollment_daily_seq RESTART WITH 1;
    END IF;

    NEW.cd_enrollment := (v_today || lpad(nextval('accounts.enrollment_daily_seq')::text, 4, '0'))::bigint;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_set_enrollment
BEFORE INSERT ON accounts.tb_account
FOR EACH ROW
EXECUTE FUNCTION accounts.fn_generate_enrollment();